const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal, .fade-in, .slide-up");
const animatedCards = document.querySelectorAll(
  ".skill-card, .metric-card, .project-card, .info-card, .contact-card, .contact-form"
);

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const setActiveNav = () => {
  const triggerPoint = window.scrollY + window.innerHeight * 0.35;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const navItem = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!navItem) return;

    if (triggerPoint >= top && triggerPoint < bottom) {
      navLinkItems.forEach((link) => link.classList.remove("active"));
      navItem.classList.add("active");
    }
  });
};

const revealOnScroll = () => {
  const viewportBottom = window.innerHeight * 0.9;
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 6) * 70}ms`;
    if (item.getBoundingClientRect().top < viewportBottom) {
      item.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", () => {
  setActiveNav();
  revealOnScroll();
});

window.addEventListener("load", () => {
  setActiveNav();
  revealOnScroll();
});

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formFeedback.textContent = "Thank you, I will reach you soon.";
    formFeedback.classList.add("success");
    contactForm.reset();
  });
}

animatedCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = (0.5 - (y / rect.height)) * 5;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
