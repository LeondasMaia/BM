/* ================================================================
   SMOOTH SCROLL — links do menu
   ================================================================ */
document.querySelectorAll("nav a.nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    window.scrollTo({
      top: targetEl.offsetTop - 64,
      behavior: "smooth",
    });
  });
});

/* ================================================================
   CARROSSEL — auto-play 5s
   ================================================================ */
let slideIndex = 1;
let autoplayTimer = null;

showSlides(slideIndex);
startAutoplay();

function plusSlides(n) {
  resetAutoplay();
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  resetAutoplay();
  showSlides((slideIndex = n));
}
function showSlides(n) {
  const slides = document.getElementsByClassName("carousel-slide");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  for (let i = 0; i < slides.length; i++) slides[i].classList.remove("active");
  for (let i = 0; i < dots.length; i++) dots[i].classList.remove("active");
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}
function startAutoplay() {
  autoplayTimer = setInterval(() => showSlides(++slideIndex), 5000);
}
function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

/* ================================================================
   HEADER SCROLLED
   ================================================================ */
const header = document.getElementById("navbar");
window.addEventListener("scroll", handleScroll, { passive: true });

/* ================================================================
   NAV ACTIVE via IntersectionObserver
   — marca a aba conforme a seção visível
   ================================================================ */
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

// Map: id → link element
const linkMap = {};
navLinks.forEach((link) => {
  const id = link.getAttribute("data-section");
  if (id) linkMap[id] = link;
});

function setActiveLink(id) {
  navLinks.forEach((l) => l.classList.remove("active"));
  if (linkMap[id]) linkMap[id].classList.add("active");
}

// IntersectionObserver: dispara quando ≥30% da seção está visível
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-70px 0px -60% 0px", // topo compensado pelo header; activa quando entra pelo topo
    threshold: 0,
  },
);

sections.forEach((section) => observer.observe(section));

function handleScroll() {
  // Header class
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}
