// 1. Security Check: Redirect to login if not authenticated
if (!localStorage.getItem("isloggedIn") === "true") {
    window.location.href = "login.html";
    window.location.href = "./index.html"; 
}

// 2. Initialize page and set permissions based on user role
window.onload = () => {
    const role = localStorage.getItem("role");

    // Hide administrative controls if the user is a students
    if (role === "student") {
        const adminControls = document.querySelectorAll(".admin-control");
        if (adminControls) {
            adminControls.classList.add("hidden");
        }
    }

    // Load and display saved attendance data
    const savedData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    savedData.forEach(student => renderRow(student.name));
    updateTotal();
};

// 3. Function to add a new student to the list
function addStudent() {
    const nameInput = document.getElementById("studentName");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter a valid name!");
        return;
    }

    renderRow(name);
    updateTotal();
    nameInput.value = ""; // Clear input field after adding
}

// 4. Function to create and display a table row
function renderRow(name) {
    const tableBody = document.getElementById("tableBody");
    const role = localStorage.getItem("role");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="roll-no"></td>
        <td>${name}</td>
        <td>${new Date().toLocaleTimeString()}</td>
        <td><span style="color: green; font-weight:bold;">present</span></td>
        <td class="action-column ${role === "student" ? "hidden" : ""}">
            <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// 5. Function to update Roll Numbers, Total Count, and LocalStorage
function updateTotal() {
    const allRows = document.querySelectorAll("#tableBody tr");
    const statsSpan = document.getElementById("totalCount");

    if (statsSpan) {
        statsSpan.innerText = allRows.length;
    }

    const attendanceArray = [];
    allRows.forEach((row, index) => {
        // Assign sequential roll numbers(1, 2, 3, ...)
        const rollCell = row.querySelector(".roll-no");
        if (rollCell) {
            rollCell.innerText = index + 1;
        }

        // Push students name to array for storage
        attendanceArray.push({ name: row.cells[1].innerText });
    });

    localStorage.setItem("attendanceList", JSON.stringify(attendanceArray)); 
}

// 6. Function to delete a specific row
function deleteRow(btn) {
    if(confirm("Are you sure you want to delete this record?")) {
        btn.closest("tr").remove();
        updateTotal(); // Re-caliculate roll numbers after deletion
    }
}

// 7. function to clear session and logout
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}