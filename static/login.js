// login.html
function togglePassword() {
  var x = document.getElementById("password");
  if (x) {
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } else {
    console.error("Password input element not found.");
  }
}
