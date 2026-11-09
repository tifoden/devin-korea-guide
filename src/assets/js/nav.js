// Mobile menu (disclosure with focus loop + Escape), grouped Product/Models panels (click/keyboard; hover only with a fine pointer, like devin.ai) and scroll-spy.
(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const toggle = header && header.querySelector(".menu-toggle");
  const menu = document.getElementById("site-menu");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = matchMedia("(min-width: 64rem)");
  const visible = (el) => el.getClientRects().length > 0;

  const hoverCapable = matchMedia("(hover: hover) and (pointer: fine)");
  const triggers = header ? [...header.querySelectorAll(".nav-trigger")] : [];
  const panelOf = (t) => document.getElementById(t.getAttribute("aria-controls"));
  const panelLinks = (t) => [...panelOf(t).querySelectorAll("a")];
  const setPanel = (t, open, focusFirst) => {
    if (open) triggers.forEach((o) => o !== t && setPanel(o, false));
    t.setAttribute("aria-expanded", String(open));
    if (open && focusFirst) panelLinks(t)[0].focus();
    root.classList.toggle("nav-panel-open", desktop.matches && triggers.some((o) => o.getAttribute("aria-expanded") === "true"));
  };
  const openTrigger = () => triggers.find((t) => t.getAttribute("aria-expanded") === "true");
  for (const t of triggers) {
    t.addEventListener("click", (e) => {
      const hovering = e.detail > 0 && hoverCapable.matches && desktop.matches && t.parentElement.matches(":hover");
      setPanel(t, hovering || t.getAttribute("aria-expanded") !== "true", e.detail === 0 && desktop.matches);
    });
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setPanel(t, true, true); }
    });
    const panel = panelOf(t);
    panel.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const links = panelLinks(t);
      const i = links.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      links[(i + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length].focus();
    });
    t.parentElement.addEventListener("focusout", (e) => {
      if (desktop.matches && e.relatedTarget && !t.parentElement.contains(e.relatedTarget)) setPanel(t, false);
    });
  }
  for (const t of triggers) {
    let timer;
    const li = t.parentElement;
    li.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse" || !hoverCapable.matches || !desktop.matches) return;
      clearTimeout(timer);
      if (t.getAttribute("aria-expanded") !== "true") setPanel(t, true);
    });
    li.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "mouse" || !desktop.matches) return;
      timer = setTimeout(() => { if (!li.contains(document.activeElement) || document.activeElement === t) setPanel(t, false); }, 150);
    });
  }
  document.addEventListener("click", (e) => {
    const t = openTrigger();
    if (t && desktop.matches && !t.parentElement.contains(e.target)) setPanel(t, false);
  });
  document.addEventListener("keydown", (e) => {
    const t = openTrigger();
    if (e.key === "Escape" && t && desktop.matches) { setPanel(t, false); t.focus(); }
  });

  if (toggle && menu) {
    const focusables = () => [toggle, ...[...menu.querySelectorAll("a, button")].filter(visible)];
    const setOpen = (open, focusFirst) => {
      header.classList.toggle("is-open", open);
      root.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (open) triggers.forEach((t) => setPanel(t, t.classList.contains("is-current")));
      if (open && focusFirst) focusables()[1].focus();
    };
    toggle.addEventListener("click", (e) => setOpen(toggle.getAttribute("aria-expanded") !== "true", e.detail === 0));
    header.addEventListener("keydown", (e) => {
      if (!header.classList.contains("is-open")) return;
      if (e.key === "Escape") { setOpen(false); toggle.focus(); return; }
      if (e.key !== "Tab") return;
      const items = focusables();
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    desktop.addEventListener("change", () => { setOpen(false); triggers.forEach((t) => setPanel(t, false)); });
  } else {
    desktop.addEventListener("change", () => triggers.forEach((t) => setPanel(t, false)));
  }
  header && header.addEventListener("click", (e) => {
    const a = e.target.closest(".nav-panel a");
    if (a && desktop.matches) setPanel(openTrigger() || triggers[0], false);
  });

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
