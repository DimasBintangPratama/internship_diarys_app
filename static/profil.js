//profil_mahasiswa.html profil_mentor.html profil_dosen.html
document.addEventListener("DOMContentLoaded", function () {
    var popup = document.getElementById("logoutSuccessPopup");
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
  