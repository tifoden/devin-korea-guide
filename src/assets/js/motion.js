// Runtime motion for the home page and official-page replicas: FAQ accordions, sticky-card dimming, in-view reveals.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (const t of document.querySelectorAll("[data-acc-trigger]")) {
    const panel = document.getElementById(t.getAttribute("aria-controls"));
    const row = t.closest("[data-acc]");
    const on = panel.dataset.accOn || "opacity-100";
    const set = (open) => {
      t.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("grid-rows-[1fr]", open);
      panel.classList.toggle("grid-rows-[0fr]", !open);
      for (const el of panel.querySelectorAll("[data-acc-fade]")) { el.classList.toggle(on, open); el.classList.toggle("opacity-0", !open); }
      for (const el of t.querySelectorAll("[data-acc-path]")) el.setAttribute("d", open ? el.dataset.dOpen : el.dataset.dClosed);
      panel.inert = !open;
    };
    const toggle = () => set(t.getAttribute("aria-expanded") !== "true");
    set(t.getAttribute("aria-expanded") === "true");
    row.addEventListener("click", (e) => { if (!panel.contains(e.target)) toggle(); });
    t.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
  }

  // Official stacked cards: once a card pins, its white overlay fades in by 0.1 per 100px of scroll up to its captured cap.
  const overlays = [...document.querySelectorAll("[data-dim-cap]")];
  if (overlays.length) {
    let marks = [];
    const stickyOf = (el) => { for (let x = el; x && x !== document.body; x = x.parentElement) if (getComputedStyle(x).position === "sticky") return x; return null; };
    const measure = () => {
      marks = overlays.map((o) => {
        const s = stickyOf(o.parentElement);
        if (!s) { o.style.opacity = "0"; return null; }
        const prev = s.style.position;
        s.style.position = "relative";
        const top = s.getBoundingClientRect().top + scrollY;
        s.style.position = prev;
        return { o, cap: +o.dataset.dimCap, start: top - (parseFloat(getComputedStyle(s).top) || 0) };
      }).filter(Boolean);
    };
    const paint = () => { for (const m of marks) m.o.style.opacity = String(Math.min(m.cap, Math.max(0, (scrollY - m.start) / 1000))); };
    let queued = false;
    addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; paint(); }); } }, { passive: true });
    addEventListener("resize", () => { measure(); paint(); });
    addEventListener("load", () => { measure(); paint(); });
    measure(); paint();
  }

  // Official mock rows fade up (opacity 0→1, translateY 6–8px→0, .45s) when they enter view; content already on screen is left as is.
  const reveals = [...document.querySelectorAll("[data-reveal]")];
  if (reveals.length && !reduce && "IntersectionObserver" in window) {
    const groups = new Map();
    for (const el of reveals) {
      if (el.getBoundingClientRect().top < innerHeight) continue;
      const g = groups.get(el.parentElement) || [];
      el.style.setProperty("--reveal-y", `${el.dataset.reveal || 8}px`);
      el.style.setProperty("--reveal-delay", `${el.dataset.revealDelay ?? g.length * 90}ms`);
      el.classList.add("reveal-pending");
      groups.set(el.parentElement, [...g, el]);
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        for (const el of groups.get(e.target)) el.classList.add("is-revealed");
      }
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    for (const parent of groups.keys()) io.observe(parent);
  }
})();

// Official mock UIs are drawn at a fixed size and scaled to their aspect-ratio box (devin.ai does this in JS).
(() => {
  const els = [...document.querySelectorAll("[data-fit-w]")];
  if (!els.length) return;
  const fit = (el) => { const w = el.parentElement.clientWidth; if (w) el.style.transform = `scale(${w / +el.dataset.fitW})`; };
  const ro = new ResizeObserver((entries) => { for (const e of entries) for (const el of els) if (el.parentElement === e.target) fit(el); });
  for (const el of els) { fit(el); ro.observe(el.parentElement); }
})();


// Official /startups case-study tabs (Finch / Exa / Eight Sleep). Only the active
// panel gets an iframe src, matching the official client bundle.
(() => {
  const list = document.querySelector("#startups-videos-tab-0")?.closest('[role="tablist"]');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[id^="startups-videos-tab-"]')];
  const panelOf = (tab, i) => document.getElementById(tab.getAttribute("aria-controls") || `startups-videos-panel-${i}`);
  const select = (i, { focus = false } = {}) => {
    tabs.forEach((tab, j) => {
      const on = j === i;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      tab.classList.toggle("bg-dt-white", on);
      tab.classList.toggle("shadow-[0_1px_2px_rgba(0,0,0,0.05)]", on);
      tab.classList.toggle("text-dt-text-tertiary", !on);
      if (tab.id === "startups-videos-tab-1") tab.classList.toggle("text-[#0143d9]", on);
      else tab.classList.toggle("text-dt-text", on);
      const panel = panelOf(tab, j);
      if (!panel) return;
      panel.hidden = !on;
      const frame = panel.querySelector("iframe");
      if (!frame) return;
      const dest = frame.getAttribute("data-src") || frame.getAttribute("src");
      if (dest && !frame.getAttribute("data-src")) frame.setAttribute("data-src", dest);
      if (on) {
        if (dest && frame.getAttribute("src") !== dest) frame.src = dest;
      } else if (frame.getAttribute("src")) {
        try { frame.contentWindow?.postMessage(JSON.stringify({ method: "pause" }), "https://player.vimeo.com"); } catch {}
        frame.removeAttribute("src");
      }
    });
    if (focus) tabs[i]?.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      select((i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length, { focus: true });
    });
  });
})();
