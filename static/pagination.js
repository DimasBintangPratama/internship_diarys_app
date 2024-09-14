// pagination
// Global Variables
let currentPages = {}; // Dictionary to store the current page for each table
const rowsPerPage = 10; // Number of rows per page for all tables

// Initialize the current page for each table
function initPagination(tableId) {
  currentPages[tableId] = 1; // Start at page 1 for each table
  displayTablePage(tableId, currentPages[tableId]);
}

// Function to display the page of the table
function displayTablePage(tableId, page) {
  const tableBody = document.querySelector(`#${tableId} tbody`); // Select tbody only
  if (!tableBody) {
    console.error("Table body element not found for table:", tableId);
    return;
  }

  const rows = tableBody.getElementsByTagName("tr");
  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  // Loop through all rows in tbody and show only those that match the current page
  for (let i = 0; i < totalRows; i++) {
    rows[i].style.display =
      i >= (page - 1) * rowsPerPage && i < page * rowsPerPage ? "" : "none";
  }

  // Update page number display
  document.getElementById(
    "pageNumber-" + tableId
  ).textContent = `Page ${page} of ${totalPages}`;

  // Disable or enable buttons based on the current page
  document.getElementById("btnPrev").disabled = page === 1;
  document.getElementById("btnNext").disabled = page === totalPages;
}

// Go to the previous page
function prevPage(tableId) {
  if (currentPages[tableId] > 1) {
    currentPages[tableId]--;
    displayTablePage(tableId, currentPages[tableId]);
  }
}

// Go to the next page
function nextPage(tableId) {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  if (!tableBody) {
    console.error("Table body element not found for table:", tableId);
    return;
  }

  const totalRows = tableBody.getElementsByTagName("tr").length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  if (currentPages[tableId] < totalPages) {
    currentPages[tableId]++;
    displayTablePage(tableId, currentPages[tableId]);
  }
}

// Initialize pagination for all tables on document ready
document.addEventListener("DOMContentLoaded", function () {
  const tables = document.getElementsByClassName("table-pagination");
  for (let i = 0; i < tables.length; i++) {
    initPagination(tables[i].id); // Initialize pagination for each table
  }
});