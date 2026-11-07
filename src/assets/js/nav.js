// Mobile menu (disclosure with focus loop + Escape) and scroll-spy for in-page section links.
(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const toggle = header && header.querySelector(".menu-toggle");
  const menu = document.getElementById("site-menu");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  if (toggle && menu) {
    const setOpen = (open, focusFirst) => {
      header.classList.toggle("is-open", open);
      root.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (open && focusFirst) menu.querySelector("a").focus();
    };
    toggle.addEventListener("click", (e) => setOpen(toggle.getAttribute("aria-expanded") !== "true", e.detail === 0));
    header.addEventListener("keydown", (e) => {
      if (!header.classList.contains("is-open")) return;
      if (e.key === "Escape") { setOpen(false); toggle.focus(); return; }
      if (e.key !== "Tab") return;
      const items = [toggle, ...menu.querySelectorAll("a")];
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    matchMedia("(min-width: 64rem)").addEventListener("change", () => setOpen(false));
  }

  const byHash = (a) => document.getElementById(decodeURIComponent(a.hash.slice(1)));
  const groups = [];
  const sectionLinks = [...document.querySelectorAll(".site-nav a[data-section]")].filter((a) => document.getElementById(a.dataset.section));
  if (sectionLinks.length) {
    groups.push({ links: sectionLinks, target: (a) => document.getElementById(a.dataset.section), value: (a) => (a.pathname === location.pathname && !a.hash ? "page" : "location") });
  }
  for (const sel of [".subnav__list a", ".toc__list a"]) {
    const links = [...document.querySelectorAll(sel)];
    if (links.length) groups.push({ links, target: byHash, value: () => "location", scroller: links[0].closest("ol") });
  }
  if (!groups.length) return;

  const update = () => {
    const line = (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0) + 8;
    const atBottom = innerHeight + scrollY >= root.scrollHeight - 2;
    for (const g of groups) {
      let active = g.value(g.links[0]) === "page" ? g.links[0] : null;
      for (const a of g.links) { const t = g.target(a); if (t && t.getBoundingClientRect().top <= line) active = a; }
      if (atBottom) active = g.links[g.links.length - 1];
      for (const a of g.links) a === active ? a.setAttribute("aria-current", g.value(a)) : a.removeAttribute("aria-current");
      if (g.scroller && active && active !== g.last && g.scroller.scrollWidth > g.scroller.clientWidth) {
        const s = g.scroller.getBoundingClientRect(), r = active.getBoundingClientRect();
        if (r.left < s.left || r.right > s.right) g.scroller.scrollBy({ left: r.left - s.left - 16, behavior: reduceMotion.matches ? "auto" : "smooth" });
      }
      g.last = active;
    }
  };
  let queued = false;
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; update(); }); } }, { passive: true });
  addEventListener("resize", update);
  update();
})();
