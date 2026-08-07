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
