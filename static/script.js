// Toggle mobile menu
function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (!mobileMenu) {
    console.error("Element with ID 'mobileMenu' not found.");
    return;
  }
  const isMenuOpen = mobileMenu.style.transform === "translateX(0%)";
  mobileMenu.style.transform = isMenuOpen
    ? "translateX(100%)"
    : "translateX(0%)";
}

document.addEventListener("DOMContentLoaded", function () {
  const profile = document.querySelector(".profile");
  const profileIcon = document.getElementById("profileIcon");
  const dropdownContent = document.getElementById("dropdownContent");

  profileIcon.addEventListener("click", function (event) {
    profile.classList.toggle("active");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
    event.stopPropagation(); // Prevent click from bubbling up to the document
  });

  document.addEventListener("click", function (event) {
    if (!profile.contains(event.target)) {
      profile.classList.remove("active");
      dropdownContent.style.display = "none";
    }
  });
});