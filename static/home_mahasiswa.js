// home_mahasiswa.html
document.addEventListener("DOMContentLoaded", function () {
    var popup = document.getElementById("loginSuccessPopup");
    if (popup) {
      setTimeout(function () {
        popup.style.opacity = "1";
        popup.style.visibility = "visible";
      }, 100);
  
      setTimeout(function () {
        popup.style.opacity = "0";
        popup.style.visibility = "hidden";
      }, 2000);
    }
  });

  
// QR code modal logic
var modal = document.getElementById("myModal");
var img = document.getElementById("qrCode");
var modalImg = document.getElementById("imgPopup");

function openPopupQR() {
  modal.style.display = "block";
  modalImg.src = img.src;
}

function closePopupQR() {
  modal.classList.add("fade-out");

  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("fade-out");
  }, 600);
}