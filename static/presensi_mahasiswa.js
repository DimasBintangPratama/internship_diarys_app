//presensi_mahasiswa.html
// search fitur
function searchPresensiMentor() {
  let input = document
    .getElementById("searchPresensiInputMentor")
    .value.toLowerCase();
  let table = document.querySelector("table tbody");
  let rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let match = false;

    for (let j = 0; j < cells.length; j++) {
      if (cells[j]) {
        if (cells[j].textContent.toLowerCase().indexOf(input) > -1) {
          match = true;
          break;
        }
      }
    }

    rows[i].style.display = match ? "" : "none";
  }
}

let editorInstance; // Membuat variabel untuk menyimpan instance CKEditor

function openEditor(id) {
  const modal = document.getElementById("editorModal");
  const textarea = document.getElementById("modalUraianTugas");
  const saveButton = document.getElementById("saveModalButton");

  let existingText = "";

  // Cek apakah elemen uraian-tugas-content ada atau tidak
  const taskElement = document.querySelector(
    `.uraian-tugas-content[data-id='${id}'] span`
  );

  if (taskElement) {
    existingText = taskElement.innerHTML; // Ambil teks HTML yang ada di elemen
  }

  // Buka modal
  modal.style.display = "block";

  // Cek apakah editor sudah ada, jika belum, baru inisialisasi
  if (!editorInstance) {
    ClassicEditor.create(textarea, {
      ckfinder: {
        uploadUrl: "/upload_image",
      },
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "|",
        "insertTable",
        "mediaEmbed",
        "imageUpload",
        "undo",
        "redo",
      ],
      image: {
        toolbar: [
          "imageTextAlternative",
          "imageStyle:full",
          "imageStyle:side",
          "removeImage",
        ],
      },
    })
      .then((editor) => {
        editorInstance = editor; // Simpan instance CKEditor
        editorInstance.setData(existingText); // Setel teks HTML yang ada ke CKEditor

        // Simpan tombol ketika klik "Simpan"
        saveButton.onclick = function () {
          const data = editorInstance.getData();
          saveUraianTugas(id, data);
        };
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // Jika editor sudah ada, cukup setel data baru
    editorInstance.setData(existingText);
  }

  // Tutup modal ketika klik di luar area modal
  window.onclick = function (event) {
    if (event.target == modal) {
      closeEditor();
    }
  };
}

function closeEditor() {
  const modal = document.getElementById("editorModal");
  modal.style.display = "none";

  // Hapus inisialisasi CKEditor dan hapus instance setelah modal ditutup
  if (editorInstance) {
    editorInstance
      .destroy()
      .then(() => {
        editorInstance = null; // Reset instance ke null
        console.log("CKEditor destroyed");
      })
      .catch((error) => {
        console.error("Error destroying CKEditor:", error);
      });
  }
}

function saveUraianTugas(id, data) {
  fetch(`/update_uraian_tugas/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uraian_tugas: data }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        // Seleksi elemen yang benar-benar menampung konten dan memperbarui DOM secara dinamis
        let taskCell = document.querySelector(
          `.uraian-tugas-content[data-id='${id}']`
        );

        if (taskCell) {
          // Jika elemen sudah ada, update kontennya
          taskCell.innerHTML = `
                        <span>${data}</span>
                        <span class="edit-icon" onclick="openEditor('${id}')">&#x270E;</span>
                    `;
        } else {
          // Jika elemen belum ada, kita buat elemen baru
          taskCell = document.querySelector(`#tambahButton${id}`).closest("td");
          taskCell.innerHTML = `
                        <div class="uraian-tugas-content" data-id="${id}">
                            <span>${data}</span>
                            <span class="edit-icon" onclick="openEditor('${id}')">&#x270E;</span>
                        </div>
                    `;
        }
        // Menampilkan alert setelah data berhasil disimpan
        alert("Great! Data berhasil disimpan dan Task Description di-update");
      }
      closeEditor(); // Tutup modal setelah menyimpan
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hmm, ada masalah saat menyimpan data. Coba lagi nanti ya.");
    });
}
