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
