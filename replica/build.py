"""Builds Korean replicas of official devin.ai product pages.
Input: replica/src/<page>-main.html (rendered official DOM), replica/i18n/<page>.json (English -> Korean),
replica/asset-map.json (official asset URL -> local path). Output: src/_includes/replica/<page>.html"""
import json, re, sys, os
from bs4 import BeautifulSoup, NavigableString
from urllib.parse import urljoin
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "_includes", "replica")
os.makedirs(OUT, exist_ok=True)
amap = json.load(open(os.path.join(HERE, "asset-map.json")))
ROUTES = {f"/{p}": f"/features/{p}/" for p in ["cloud", "desktop", "cli", "mobile", "review", "security", "oncall"]}

def local(u):
    full = urljoin("https://devin.ai/", u)
    return amap.get(full, {}).get("local")

def _lum(r, g, b):
    f = lambda c: (c / 255) / 12.92 if c <= 10 else ((c / 255 + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def _darken(r, g, b, bg=0.87):
    while (bg + 0.05) / (_lum(r, g, b) + 0.05) < 4.6 and (r or g or b):
        r, g, b = int(r * 0.92), int(g * 0.92), int(b * 0.92)
    return r, g, b

def fix_color(style):
    """Darken low-contrast inline text colors in mock UIs (assumes light backgrounds)."""
    def rep(m):
        v = m.group(2).strip()
        h = re.fullmatch(r"#([0-9a-fA-F]{6})", v)
        a = re.fullmatch(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)", v)
        if h:
            r, g, b = (int(h.group(1)[i:i + 2], 16) for i in (0, 2, 4))
        elif a:
            r, g, b = (int(x) for x in a.groups()[:3]); al = float(a.group(4) or 1)
            if r + g + b > 600: return m.group(0)
            r, g, b = (round(c * al + 252 * (1 - al)) for c in (r, g, b))
        else:
            return m.group(0)
        if _lum(r, g, b) < 0.18: return m.group(0)
        r, g, b = _darken(r, g, b)
        return f"{m.group(1)}#{r:02x}{g:02x}{b:02x}"
    return re.sub(r"((?:^|;)\s*color:\s*)([^;]+)", rep, style)

DARK = re.compile(r"(^dark$|bg-black(?:$|/(?:[6-9]\d|100)$)|bg-\[#[0-3]|bg-neutral-9|bg-zinc-9|bg-gray-9|text-white|theme-inverse|terminal)")

def in_dark(el):
    for a in [el, *el.parents]:
        if getattr(a, "attrs", None) is None: continue
        if any(DARK.search(c) for c in a.get("class", [])): return True
        st = a.get("style") or ""
        m = re.search(r"background(?:-color)?:\s*(#[0-3][0-9a-fA-F]{5}|rgb\(\s*\d{1,2}\s*,)", st)
        if m: return True
    return False

def fix_color_dark(style):
    """Lighten low-contrast gray text inside dark mock UIs (assumes ~#1f1f1f backgrounds)."""
    def rep(m):
        a = re.fullmatch(r"(?:#([0-9a-fA-F]{6})|rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))", m.group(2).strip())
        if not a: return m.group(0)
        r, g, b = (int(a.group(1)[i:i + 2], 16) for i in (0, 2, 4)) if a.group(1) else (int(x) for x in a.groups()[1:])
        if max(r, g, b) - min(r, g, b) > 24: return m.group(0)
        while (_lum(r, g, b) + 0.05) / (_lum(31, 31, 31) + 0.05) < 4.8 and r < 250:
            r, g, b = (min(255, c + 8) for c in (r, g, b))
        return f"{m.group(1)}#{r:02x}{g:02x}{b:02x}"
    return re.sub(r"((?:^|;)\s*color:\s*)([^;]+)", rep, style)

def lift_opacity(el, style):
    """Partially transparent text blocks in mock UIs fail contrast; lift them while keeping the dimmed look."""
    m = re.search(r"opacity:\s*(0?\.\d+)", style)
    if m and 0.2 < float(m.group(1)) < 0.8 and el.get_text(strip=True):
        style = style.replace(m.group(0), "opacity: 0.82")
    return style

def unmotion(style):
    m = re.search(r"opacity:\s*(0(?:\.\d+)?)(?![\d.])", style)
    if m and (float(m.group(1)) == 0 or "transform" in style or "blur" in style):
        style = style.replace(m.group(0), "opacity: 1")
        style = re.sub(r"transform:[^;]+", "transform: none", style)
        style = re.sub(r"filter:\s*blur\([^)]*\)", "filter: none", style)
    return style

def build(name, fixups=None):
    soup = BeautifulSoup(open(os.path.join(HERE, "src", f"{name}-main.html")).read(), "html.parser")
    root = soup.find(True)
    if root.name == "main": root.name = "div"
    tr = json.load(open(os.path.join(HERE, "i18n", f"{name}.json")))
    missing = []
    for t in list(root.find_all(string=True)):
        v = t.strip()
        if not v: continue
        key = v if v in tr else v.strip('“”"')
        if key in tr:
            q = v != key
            lead = t[: len(t) - len(t.lstrip())]; tail = t[len(t.rstrip()):]
            t.replace_with(NavigableString(lead + (f'“{tr[key]}”' if q else tr[key]) + tail))
        elif re.search(r"[A-Za-z]{4,}\s+[A-Za-z]{3,}\s+[A-Za-z]{3,}", v) and t.parent.name not in ("code",):
            missing.append(v)
    for el in root.find_all(True):
        for a in ("alt", "aria-label", "placeholder", "title"):
            if el.get(a) and el[a].strip() in tr: el[a] = tr[el[a].strip()]
        for a in ("src", "poster", "data-src"):
            if el.get(a) and not el[a].startswith("data:"):
                l = local(el[a]); el[a] = l or urljoin("https://devin.ai/", el[a])
        if el.get("srcset"):
            first = el["srcset"].split(",")[0].strip().split(" ")[0]
            l = local(first)
            if el.name == "source":
                el["srcset"] = l or urljoin("https://devin.ai/", first)
            else:
                del el["srcset"]
                if l and not el.get("src", "").startswith("/assets"): el["src"] = l
            if el.get("sizes"): del el["sizes"]
        if el.get("style"):
            el["style"] = lift_opacity(el, fix_color_dark(unmotion(el["style"])) if in_dark(el) else fix_color(unmotion(el["style"])))
            el["style"] = re.sub(r"url\(['\"]?([^'\")]+)['\"]?\)", lambda m: f"url({local(m.group(1)) or m.group(1)})", el["style"])
        if el.name == "a" and el.get("href"):
            h = el["href"]
            if h.startswith("/") and not h.startswith("//"):
                path = h.split("#")[0].rstrip("/")
                el["href"] = ROUTES.get(path, ("https://app.devin.ai" if name == "review" else "https://devin.ai") + h)
        for a in list(el.attrs):
            if a.startswith(("data-tally", "data-nimg")) or a in ("decoding", "fetchpriority"): del el[a]
        if el.name == "img" and not el.get("loading"): el["loading"] = "lazy"
    if fixups: fixups(soup, root)
    common_fix(soup, root)
    html = str(root)
    open(os.path.join(OUT, f"{name}.html"), "w").write(html)
    print(name, len(html), "untranslated:", len(missing))
    for m in missing[:40]: print("   ?", m[:110])

def mobile_fix(soup, root):
    f = root.find("iframe")
    if f:
        box = f.parent
        box.clear()
        box["class"] = ["min-w-0"]
        a = soup.new_tag("a", href="https://devin.ai/mobile")
        a["class"] = ["flex", "h-[42px]", "w-full", "items-center", "justify-between", "rounded-full", "bg-black/[0.06]", "px-4", "text-14", "text-dt-text-secondary", "no-underline"]
        a.string = "공식 페이지(devin.ai/mobile)에서 대기자 명단 신청 ↗"
        box.append(a)

def review_fix(soup, root):
    f = root.find("form")
    if f:
        inp = f.find("input")
        box = inp.parent if inp else None
        if box:
            a = soup.new_tag("a", href="https://app.devin.ai/review")
            a["class"] = inp.get("class", []) + ["flex", "items-center", "no-underline", "text-text-secondary"]
            a.string = "app.devin.ai/review에서 내 PR 리뷰하기 ↗"
            inp.replace_with(a)
            for b in box.find_all("button"): b.decompose()
        f.name = "div"
        for k in ("action", "method"):
            if f.get(k): del f[k]
    for b in root.find_all("button"):
        if b.get("type") == "submit": b["type"] = "button"
    for el in root.find_all(style=re.compile("Excalifont")):
        el["style"] = re.sub(r"font-family:[^;]*Excalifont[^;]*", 'font-family: Excalifont, "Pretendard Variable", Pretendard, sans-serif', el["style"])

def common_fix(soup, root):
    for b in root.find_all("button"):
        b.name = "span"
        for a in ("type", "aria-expanded", "aria-controls", "aria-pressed", "aria-label", "aria-haspopup", "disabled", "tabindex", "data-state"):
            if b.get(a) is not None: del b[a]
    for el in root.find_all(attrs={"role": ["tab", "tablist", "tabpanel"]}):
        del el["role"]
        for a in ("aria-selected", "aria-controls", "aria-labelledby", "tabindex"):
            if el.get(a) is not None: del el[a]
    for el in root.find_all("div", class_="pointer-events-none"):  # scroll-dim overlays captured mid-animation
        c = el.get("class", [])
        if "absolute" in c and "inset-0" in c and "bg-white" in c and not el.find(True) and "opacity" in (el.get("style") or ""):
            el["style"] = re.sub(r"opacity:\s*[\d.]+", "opacity: 0", el["style"])
    for el in root.find_all(["dl", "dt", "dd"]):
        el.name = "div"
    for el in root.find_all(True):
        if el.get("style") and re.search(r"overflow(-[xy])?:\s*(auto|scroll)", el["style"]):
            el["style"] = re.sub(r"overflow(-[xy])?:\s*(auto|scroll)", r"overflow\1: hidden", el["style"])
        cls = el.get("class")
        if cls and any(c in ("overflow-y-auto", "overflow-auto", "overflow-x-auto", "overflow-scroll", "overflow-y-scroll", "overflow-x-scroll") for c in cls):
            el["class"] = [("overflow-hidden" if c in ("overflow-y-auto", "overflow-auto", "overflow-x-auto", "overflow-scroll", "overflow-y-scroll", "overflow-x-scroll") else c) for c in cls]
    for i, h in enumerate(root.find_all("h1")):
        if i: h.name = "p"

FIX = {"mobile": mobile_fix, "review": review_fix}

if __name__ == "__main__":
    for n in sys.argv[1:] or ["cloud", "desktop", "cli", "mobile", "security", "oncall", "review"]:
        build(n, FIX.get(n))
