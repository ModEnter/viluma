const mobileRdvButton = document.getElementById("mobile-rdv");
const toggleMobileRdv = () => {
  if (!mobileRdvButton) {
    return;
  }
  mobileRdvButton.style.display = window.innerWidth < 900 ? "inline-flex" : "none";
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", toggleMobileRdv);
} else {
  toggleMobileRdv();
}
window.addEventListener("resize", toggleMobileRdv);
