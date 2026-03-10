const toggleMobileRdv = () => {
  const mobileRdvButton = document.getElementById("mobile-rdv");
  if (!mobileRdvButton) {
    return;
  }
  mobileRdvButton.style.display = window.innerWidth < 900 ? "inline-flex" : "none";
};

const highlightActiveNavLink = () => {
  const currentPage = document.body.dataset.page;
  if (!currentPage) {
    return;
  }
  const activeLink = document.querySelector(`[data-nav-key="${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
};

const adjustNavbarLinkPaths = () => {
  const basePath = document.body.dataset.basePath || "";
  if (!basePath) {
    return;
  }
  const nav = document.querySelector("[data-component=\"navbar\"] nav");
  if (!nav) {
    return;
  }
  const anchors = nav.querySelectorAll("a[href]");
  anchors.forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href) {
      return;
    }
    const skip = href.startsWith("#") || href.startsWith("http") || href.startsWith("https") || href.startsWith("mailto") || href.startsWith("tel") || href.startsWith("//");
    if (skip) {
      return;
    }
    anchor.setAttribute("href", `${basePath}${href}`);
  });
};

const insertNavbar = () => {
  const placeholder = document.querySelector("[data-component=\"navbar\"]");
  if (!placeholder) {
    return;
  }
  if (!window.VilumaNavbarTemplate) {
    console.error("Navbar template missing");
    return;
  }
  placeholder.innerHTML = window.VilumaNavbarTemplate;
  adjustNavbarLinkPaths();
  highlightActiveNavLink();
};

const setupScrollAnimations = () => {
  const animatedElements = document.querySelectorAll(
    ".section-plateau > *, .section-boxes-inner > *, .box-card"
  );
  if (!animatedElements.length) {
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observer.observe(el);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  toggleMobileRdv();
  window.addEventListener("resize", toggleMobileRdv);
  setupScrollAnimations();
});
