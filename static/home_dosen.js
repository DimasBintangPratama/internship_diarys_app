// home_dosen.html
function fetchKehadiranData() {
    fetch("/kehadiran_hari_ini")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        drawKehadiranPieChart(data);
      })
      .catch((error) => {
        console.error("Error fetching kehadiran data:", error);
      });
  }
  
  function drawKehadiranPieChart(data) {
    const ctx = document.getElementById("kehadiranChart").getContext("2d");
  
    const hadir = data.Hadir;
    const sakit = data.Sakit;
    const izin = data.Izin;
    const alpha = data.Alpha;
  
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "Hadir" + " : " + hadir,
          "Sakit" + " : " + sakit,
          "Izin" + " : " + izin,
          "Alpha" + " : " + alpha,
        ],
        datasets: [
          {
            label: "Kehadiran Hari Ini",
            data: [hadir, sakit, izin, alpha],
            backgroundColor: ["#81e5f4", "#53bef3", "#377dc2", "#0c3b73"],
            borderColor: ["#81e5f4", "#53bef3", "#377dc2", "#0c3b73"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'left', // Position legend on the right side
            align: 'start',   // Align the labels from the top
          },
          tooltip: {
            callbacks: {
              label: function () {
                return "Mahasiswa";
              },
            },
          },
        },
      },
    });
  }
  
  // Panggil fungsi untuk menggambar chart setelah halaman dimuat
  function fetchProjectStatusData() {
    fetch("/get_project_status_data")
      .then((response) => response.json())
      .then((data) => {
        drawProjectStatusPieChart(data);
      })
      .catch((error) => {
        console.error("Error fetching project status data:", error);
      });
  }
  
  function drawProjectStatusPieChart(data) {
    const ctx = document.getElementById("statusProjectChart").getContext("2d");
  
    const totalOngoing = data.total_ongoing;
    const totalCompleted = data.total_completed;
  
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "On Going" + " : " + totalOngoing,
          "Completed" + " : " + totalCompleted,
        ],
        datasets: [
          {
            label: "Status Project",
            data: [totalOngoing, totalCompleted],
            backgroundColor: ["#377dc2", "#0c3b73"],
            borderColor: ["#377dc2", "#0c3b73"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'left', // Position legend on the right side
            align: 'start',   // Align the labels from the top
          },
          tooltip: {
            callbacks: {
              label: function () {
                return "Project";
              },
            },
          },
        },
      },
    });
  }
  
  // Panggil fungsi untuk menggambar chart setelah halaman dimuat
  document.addEventListener("DOMContentLoaded", function () {
    fetchKehadiranData();
    fetchProjectStatusData();
  });