const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const typewriter = document.getElementById("typewriter");

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  const lightMode = body.classList.contains("light-theme");
  themeToggle.textContent = lightMode ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", lightMode ? "Switch to dark theme" : "Switch to light theme");
});

// Typewriter text animation
const phrases = ["web experiences", "useful applications", "data-driven projects", "new ideas"];
let phraseIndex = 0;
let charIndex = phrases[0].length;
let deleting = true;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  if (deleting) {
    charIndex--;
    typewriter.textContent = phrase.slice(0, Math.max(0, charIndex));
    if (charIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 350);
      return;
    }
    setTimeout(typeLoop, 42);
  } else {
    const nextPhrase = phrases[phraseIndex];
    charIndex++;
    typewriter.textContent = nextPhrase.slice(0, charIndex);
    if (charIndex >= nextPhrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1450);
      return;
    }
    setTimeout(typeLoop, 72);
  }
}
setTimeout(typeLoop, 1500);

// Reveal cards and sections as they enter the viewport
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    observer.observe(el);
  });
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

// Highlight the active navigation item while scrolling
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
}

// Subtle pointer glow on devices with a mouse
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  if (event.pointerType === "mouse") {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
}, { passive: true });
