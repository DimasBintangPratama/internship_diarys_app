// permission_mahasiswa.html
// membuka popup
function openPopup() {
  document.getElementById("permissionFormPopup").style.display = "flex";
}

// menutup popup
function closePopup() {
  document.getElementById("permissionFormPopup").style.display = "none";
}

// Tutup popup jika pengguna mengklik di luar form
window.onclick = function (event) {
  const popup = document.getElementById("permissionFormPopup");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};

document.querySelector("form").onsubmit = function (event) {
  event.preventDefault(); // Menghentikan form dari submit secara default

  // Ambil data dari form
  let formData = new FormData(this);

  fetch("/submit_permission", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        // Ambil tabel dan tambahkan baris baru dengan data yang dimasukkan
        let table = document.querySelector("table tbody");
        let newRow = table.insertRow();

        // Tambahkan data ke dalam baris baru
        newRow.insertCell(0).innerText = table.rows.length; // NO
        newRow.insertCell(1).innerText = data.permission.nama; // Nama
        newRow.insertCell(2).innerText = data.permission.mulai; // Tanggal Mulai
        newRow.insertCell(3).innerText = data.permission.selesai; // Tanggal Selesai
        newRow.insertCell(4).innerText = data.permission.status; // Status

        let proofCell = newRow.insertCell(5);
        if (data.permission.bukti) {
          let proofLink = document.createElement("a");
          proofLink.href = "/static/uploads/proof/" + data.permission.bukti;
          proofLink.innerText = data.permission.bukti;
          proofLink.download = data.permission.bukti;
          proofCell.appendChild(proofLink);
        } else {
          proofCell.innerText = "No Proof";
        }

        newRow.insertCell(6).innerText = data.permission.keterangan; // Keterangan

        // Tutup popup setelah berhasil menambahkan data
        closePopup();

        // Tampilkan alert setelah submit berhasil
        alert("Woohoo! Data Permission berhasil di-update!");
      } else {
        alert("Oops! Ada yang salah: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// search table pada permission
function searchTable() {
  // Ambil input dari pengguna
  let input = document.getElementById("searchInput").value.toLowerCase();
  let table = document.querySelector("table tbody");
  let rows = table.getElementsByTagName("tr");

  // Loop untuk semua baris di dalam tabel
  for (let i = 0; i < rows.length; i++) {
    // Ambil teks dari setiap kolom yang perlu dicari
    let nama = rows[i].getElementsByTagName("td")[1].textContent.toLowerCase();
    let mulai = rows[i].getElementsByTagName("td")[2].textContent.toLowerCase();
    let selesai = rows[i]
      .getElementsByTagName("td")[3]
      .textContent.toLowerCase();
    let status = rows[i]
      .getElementsByTagName("td")[4]
      .textContent.toLowerCase();
    let keterangan = rows[i]
      .getElementsByTagName("td")[6]
      .textContent.toLowerCase();

    // Cek apakah input cocok dengan teks di salah satu kolom
    if (
      nama.includes(input) ||
      mulai.includes(input) ||
      selesai.includes(input) ||
      status.includes(input) ||
      keterangan.includes(input)
    ) {
      rows[i].style.display = ""; // Tampilkan baris jika cocok
    } else {
      rows[i].style.display = "none"; // Sembunyikan baris jika tidak cocok
    }
  }
}
