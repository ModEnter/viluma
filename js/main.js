const NAV_COMPONENT_PATH = "components/navbar.html";

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

const loadNavbar = async () => {
  const placeholder = document.querySelector("[data-component=\"navbar\"]");
  if (!placeholder) {
    return;
  }
  try {
    const response = await fetch(NAV_COMPONENT_PATH);
    if (!response.ok) {
      throw new Error(`Failed to load navbar (${response.status})`);
    }
    placeholder.innerHTML = await response.text();
    highlightActiveNavLink();
  } catch (error) {
    console.error(error);
  }
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

document.addEventListener("DOMContentLoaded", async () => {
  await loadNavbar();
  toggleMobileRdv();
  window.addEventListener("resize", toggleMobileRdv);
  setupScrollAnimations();
});
