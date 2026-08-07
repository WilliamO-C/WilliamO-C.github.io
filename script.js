// Footer year
const yearMark = document.getElementById("year-mark");
if (yearMark) yearMark.textContent = `© ${new Date().getFullYear()}`;

// Scroll-spy: highlight the nav link for the section in view
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute("href") === `#${id}` ? "var(--ink)" : "";
  });
};

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
}

// NOTE: deliberately no JS-driven "hide until scrolled into view" animation
// here. An earlier version set opacity:0 in JS and revealed via
// IntersectionObserver -- but a full-page render/screenshot (and, more
// importantly, any browser where that JS fails, is blocked, or simply
// hasn't run yet) left most of the page permanently invisible. Content
// should never depend on JS to become visible. The CSS-only fade-in in
// style.css (@keyframes reveal, on load, no scroll dependency) gives a
// similar entrance effect with no failure mode.

// Theme toggle (dark/light). The actual attribute is applied synchronously
// in a tiny inline <script> in <head> (before first paint) to avoid a flash
// of the wrong theme -- this just wires up the button and keeps localStorage
// in sync for next time.
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      try { localStorage.setItem("theme", "dark"); } catch (e) {}
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      try { localStorage.setItem("theme", "light"); } catch (e) {}
    }
  });
}
