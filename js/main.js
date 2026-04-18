const setupBurgerMenu = () => {
  const nav = document.querySelector("nav");
  if (!nav) return;

  const burger = nav.querySelector(".burger");
  const navLinks = nav.querySelector(".nav-links");
  if (!burger || !navLinks) return;

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.classList.add("nav-overlay");
  nav.parentElement.insertBefore(overlay, nav.nextSibling);

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle("open");
    burger.classList.toggle("open");
    overlay.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
    burger.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    overlay.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  // Close menu when clicking a nav link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      closeMenu();
    }
  });

  // Close menu if resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
};

const highlightActiveNavLink = () => {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;
  const activeLink = document.querySelector(`[data-nav-key="${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
};

const adjustNavbarLinkPaths = () => {
  const basePath = document.body.dataset.basePath || "";
  if (!basePath) return;
  const nav = document.querySelector("[data-component=\"navbar\"] nav");
  if (!nav) return;
  const anchors = nav.querySelectorAll("a[href]");
  anchors.forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href) return;
    const skip = href.startsWith("#") || href.startsWith("http") || href.startsWith("https") || href.startsWith("mailto") || href.startsWith("tel") || href.startsWith("//");
    if (skip) return;
    anchor.setAttribute("href", `${basePath}${href}`);
  });
};

const insertNavbar = () => {
  const placeholder = document.querySelector("[data-component=\"navbar\"]");
  if (!placeholder) return;
  if (!window.VilumaNavbarTemplate) {
    console.error("Navbar template missing");
    return;
  }
  placeholder.innerHTML = window.VilumaNavbarTemplate;
  adjustNavbarLinkPaths();
  highlightActiveNavLink();
};

const setupScrollAnimations = () => {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  const animatedElements = document.querySelectorAll(
    ".section-plateau > *, .section-boxes-inner > *, .box-card, " +
    ".section-localisation .adresse-block, .section-cta > *, .blog-card"
  );
  if (!animatedElements.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observer.observe(el);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  setupBurgerMenu();
  setupScrollAnimations();
});
