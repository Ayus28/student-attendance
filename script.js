let count = 1;

// 1. Jab page load ho, data wapis lao
window.onload = function() {
    let savedData = localStorage.getItem("attendanceData");
    if (savedData) {
        const students = JSON.parse(savedData);
        students.forEach(student => {
            renderRow(student.name);
        });
    }
    updateTotal();
};

// 2. Naya Student Add karne ke liye
function addAttendance() {
    const nameInput = document.getElementById("StudentName");
    const name = nameInput.value.trim();

    if (name === "") {
         alert("Please enter a name!");
         return
    }

    renderRow(name);
    nameInput.value = "";
    nameInput.focus();
}

// 3. Table mein Row banne ke liye
function renderRow(name) {
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");

     row.innerHTML = `
        <td class="roll-no"></td>
        <td>${name}</td>
        <td>${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}</td>
        <td>present</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;
    tableBody.appendChild(row);

}

// 4. Roll Number update and Data save in main function
function updateTotal() {
    const allRows = document.querySelectorAll("#tableBody tr");
   
    // Run a loop on each row and set the roll number(1,2,3...)
    allRows.forEach((row, index) => {
        const rollCell = row.querySelector(".roll-no");
        if (rollCell) {
            rollCell.innerText = index + 1; // It starts from index 0, so...
        }
    });

    // The remaining count and storage work is done here
    const statsSpan = document.getElementById("totalCount");
    if (statsSpan) statsSpan.innerText = allRows.length;

    const attendanceArray = [];
    allRows.forEach(row => {
        attendanceArray.push({ name: row.cells[1].innerText });
    });
    localStorage.setItem("attendanceData", JSON.stringify(attendanceArray));
}

// 5. Delete karne ke liye
function deleteRow(btn) {
    if(confirm("Click OK to delete")){
        btn.parentElement.parentElement.remove();
        updateTotal();
    }
}

// 6. Sab saaf karne ke liye
function clearALL() {
    if(confirm("Click OK to Clear the list?")){
        document.getElementById("tableBody").innerHTML = "";
        localStorage.removeItem("attendanceData");
        updateTotal();
    }
}

// 7. YE HI MAIN FUNCTION: jo count sahi karega aur SAVE karega 
function updateTotal() {
    const allRows = document.querySelectorAll("#tableBody tr");
    const statsSpan = document.getElementById("totalcount");

    if (statsSpan) statsSpan.innerText = allRows.length;

    const attendanceArray = []; 

    allRows.forEach((Row, index) => {
        const rollCell = Row.querySelector(".roll-no");
        if (rollCell) rollCell.innerText = index + 1;

        attendanceArray.push({ name: row.cells[1].innerHTML});
    });

    // Agla number set karne ke liye
    count = allRows.length + 1;

    // Memory mein save karne ke liye
    localStorage.setItem("attendanceList", JSON.stringify(attendanceArray));
}

// 8. Excel Export Fix
function exportTableTOCSV() {
    let csv = "ROLL No, Name, Date & Time, status\n";
    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        const cols = row.querySelectorAll("td");
        let rowData = [];
        for (let i = 0; i < cols.length - 1; i++) {
            rowData.push(cols[i].innerText);
        }
        csv += rowData.join(",") + "\n";
    })

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "Attendance_Report.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}        