// project_mahasiswa.html

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
$(document).ready(function () {
  $(".status-dropdown").change(function () {
    var projectId = $(this).data("project-id");
    var newStatus = $(this).val();

    $.ajax({
      url: "/update_project_status/" + projectId,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ status: newStatus }),
      success: function (response) {
        console.log("Status updated successfully");
        location.reload(); // Refresh halaman untuk update status
      },
    });
  });
});

function updateStatus(projectId, newStatus) {
  fetch(`/update_project_status/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Woohoo! Status project berhasil di-update!");
        // Update status box without reloading the page
        document.querySelector(".status.ongoing h3").textContent =
          data.total_ongoing;
        document.querySelector(".status.completed h3").textContent =
          data.total_completed;
      } else {
        alert("Oops, gagal update status project, coba lagi ya.");
      }
    })
    .catch((error) => {
      console.error("Error updating status:", error);
      alert("Hmm, ada masalah saat update status. Coba lagi nanti ya.");
    });
}
