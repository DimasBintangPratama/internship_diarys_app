// detail_presensi.html & detail_project.html
// search fitur
function searchPresensiDosen() {
  // Ambil input dari user
  let input = document
    .getElementById("searchPresensiInputDosen")
    .value.toLowerCase();
  let table = document.querySelector("table tbody");
  let rows = table.getElementsByTagName("tr");

  // Loop melalui semua baris dalam tabel
  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let match = false;

    // Loop melalui semua sel dalam baris
    for (let j = 0; j < cells.length; j++) {
      if (cells[j]) {
        // Jika ada teks yang cocok, set match menjadi true
        if (cells[j].textContent.toLowerCase().indexOf(input) > -1) {
          match = true;
          break;
        }
      }
    }

    // Tampilkan atau sembunyikan baris berdasarkan kecocokan
    rows[i].style.display = match ? "" : "none";
  }
}

function searchProjectDosen() {
  let input = document
    .getElementById("searchProjectInputDosen")
    .value.toLowerCase();
  let table = document.querySelector("table tbody");
  let rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let match = false;

    for (let j = 0; j < cells.length; j++) {
      if (cells[j]) {
        // Match against the displayed text (e.g., student names, project title)
        if (cells[j].textContent.toLowerCase().indexOf(input) > -1) {
          match = true;
          break;
        }
      }
    }

    rows[i].style.display = match ? "" : "none";
  }
}
