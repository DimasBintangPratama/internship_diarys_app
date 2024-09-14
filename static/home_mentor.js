// home_mentor.html
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
  
  function updateApproval(checkbox, presensiId) {
    const isChecked = checkbox.checked ? 1 : 0;
  
    fetch(`/update_approval_mentor/${presensiId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approval_mentor: isChecked }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Approval updated successfully");
          alert("Woohoo! Status approval mentor berhasil di-update!");
        } else {
          console.log("Failed to update approval");
          alert("Oops, gagal update approval, coba lagi ya.");
        }
      })
      .catch((error) => {
        console.error("Error updating approval:", error);
        alert("Oops, ada masalah saat update approval. Coba lagi nanti.");
      });
  }
  
  function exportToExcel(type) {
    window.location.href = "/export_excel?type=" + type;
  }