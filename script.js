let count = 1;

// Load Data on Strtup
window.onload = function() {
    let savedData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    savedData.forEach(item => renderRow(item.name, item.time, false));
    updateTotal();
};

function addAttendance() {
    const nameInput = document.getElementById("StudentName");
    const name = nameInput.value.trim();
    if (name === "") return alert("Naam likhiye");

    const time = new Date().toLocaleString();
    renderRow(name, time, true);

    nameInput.value = "";
    nameInput.focus();
}

function renderRow(name, time, isNew) {
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");

//
     row.innerHTML = `
        <td class="roll-no"></td>
        <td class="sName">${name}</td>
        <td>${time}</td>
        <td class="status-present">present</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;//
    tableBody.appendChild(row)
    if (isNew) saveToLocal();
    updateTotal();
}

function searchStudent() {
    let filter = document.getElementById("searchInput").value.toUpperCase();
    let rows = document.querySelector("#tableBody").rows;
    for (let i = 0; i< rows.length; i++){
        let name = rows[i].querySelector(".sName").innerText;
        rows[i].style.display = name.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
}

function saveToLocal() {
    let data = [];
    document.querySelectorAll("#tableBody tr").forEach(row => {
        data.push({
            name: row.querySelector(".sName").innerText,
            time: row.cells[2].innerText
        });
    });
    localStorage.setItem("attendance", JSON.stringify(data));
}

function deleteRow(btn) {
    btn.parentElement.parentElement.remove();
    updateTotal();
}

function clearALL() {
    if(confirm("kya aap saara data delete karna chahte hain?")){
        document.getElementById("tableBody").innerHTML = "";
        count = 1;
        updateTotal();
    }
}

function exportTableToCSV(Filename) {
    let csv = [];
    let rows = document.querySelectorAll("table tr");
    for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td,th");
        for ( let j=0; j < cols.length - 1; j++) row.push(cols[j].innerText);
        csv.push(row.join(","));
    }
    let csvFile = new Blob([csv.join("\n")], { type: "type/csv" });
    let downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.download = "Attendance_Report.csv";
    downloadLink.click();
}
function updateTotal() {

    const allRows = document.querySelectorAll("#tableBody tr");
    const statsSpan = document.getElementById("totalCount");

    if(statsSpan) statsSpan.innerText = allRows.length;

    allRows.forEach((ekrow, index) => {
        const rollNoCell = ekrow.querySelector(".roll-no");
        if (rollNoCell) {
            rollNoCell.innerText = index + 1;
        }
    });

    count = allRows.length + 1;
} //