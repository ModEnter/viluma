const highlightActiveNavLink = () => {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;
  const activeLink = document.querySelector(`[data-nav-key="${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
};

const setupScrollAnimations = () => {
  const animatedElements = document.querySelectorAll(
    ".section-plateau > *, .section-boxes-inner > *, .box-card, .card, .member, .valeur-card, .blog-card, .dark-card"
  );
  if (!animatedElements.length) return;
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

const setupBlogFilters = () => {
  const filters = document.querySelectorAll(".blog-filter");
  if (!filters.length) return;
  const cards = document.querySelectorAll(".blog-cards .blog-card[data-categories]");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.category;
      cards.forEach((card) => {
        if (cat === "all" || card.dataset.categories.split(",").includes(cat)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNavLink();
  setupScrollAnimations();
  setupBlogFilters();
});
