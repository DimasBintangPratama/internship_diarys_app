// project_mentor.html
// search fitur
function searchProjectMentor() {
    let input = document
      .getElementById("searchProjectInputMentor")
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
  
  function resetTambahProjectModal() {
    // Reset input field
    document.getElementById("judul_project").value = "";
    document.getElementById("deadline").value = "";
  
    // Uncheck all checkboxes
    const mahasiswaCheckboxes = document.querySelectorAll(
      "#mahasiswa-checkboxes input[type='checkbox']"
    );
    mahasiswaCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  
    // Set action form kembali ke 'tambah_project'
    document.getElementById("tambahProjectForm").action = "/tambah_project";
  }
  
  function showTambahProjectModal() {
    // Panggil fungsi reset sebelum menampilkan modal
    resetTambahProjectModal();
    document.getElementById("tambahProjectModal").style.display = "block";
  
    // Add event listener to the form submission for the alert
    document.getElementById("tambahProjectForm").onsubmit = function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Show the alert
      alert("Yeay! Data project berhasil di-update.");
  
      // Proceed with form submission
      this.submit();
    };
  }
  
  function showEditProjectModal(projectId) {
    fetch(`/edit_project_data/${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        // Isi form dalam modal dengan data yang diterima dari server
        document.getElementById("judul_project").value = data.judul_project;
        document.getElementById("deadline").value = data.deadline;
  
        // Set nilai dari checkbox mahasiswa yang terlibat
        const mahasiswaCheckboxes = document.querySelectorAll(
          "#mahasiswa-checkboxes input[type='checkbox']"
        );
        mahasiswaCheckboxes.forEach((checkbox) => {
          checkbox.checked = data.mahasiswa_ids.includes(checkbox.value);
        });
  
        // Ubah action form untuk menyimpan update
        document.getElementById(
          "tambahProjectForm"
        ).action = `/update_project/${projectId}`;
  
        // Tampilkan modal
        document.getElementById("tambahProjectModal").style.display = "block";
        // Add event listener to form submit for the alert
        document.getElementById("tambahProjectForm").onsubmit = function (event) {
          event.preventDefault(); // Prevent the default form submission
  
          // Show the alert
          alert("Yes! Data Project berhasil di-update.");
  
          // Proceed with form submission
          this.submit();
        };
      })
      .catch((error) => console.error("Error:", error));
  }
  
  function closeTambahProjectModal() {
    document.getElementById("tambahProjectModal").style.display = "none";
    resetTambahProjectModal();
  }