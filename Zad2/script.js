function addRow() {
    const table = document.getElementById("taskTable");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" placeholder="Name"></td>
        <td><input type="text" placeholder="Priority"></td>
        <td><input type="date" placeholder="Due to"></td>
        <td>
            <div class="button-container"><button onclick="saveRow(this)">Zapisz</button></div>
        </td>
        <td>
            <div class="button-container"><button onclick="removeRow(this)">Usuń</button></div>
        </td>
    `;
    
    table.appendChild(row);
}

function saveRow(button) {
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("input");
    const name = inputs[0].value;
    const priority = inputs[1].value;
    const dueTo = inputs[2].value;

    row.innerHTML = `
        <td>${name}</td>
        <td>${priority}</td>
        <td>${dueTo}</td>
        <td>
            <div class="button-container"><button onclick="editRow(this)">Edytuj</button></div>
        </td>
        <td>
            <div class="button-container"><button onclick="removeRow(this)">Usuń</button></div>
        </td>
    `;
}

function editRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");
    const name = cells[0].textContent;
    const priority = cells[1].textContent;
    const dueTo = cells[2].textContent;
    
    row.innerHTML = `
        <td><input type="text" value="${name}"></td>
        <td><input type="text" value="${priority}"></td>
        <td><input type="date" value="${dueTo}"></td>
        <td>
            <div class="button-container"><button onclick="saveRow(this)">Zapisz</button></div>
        </td>
        <td>
            <div class="button-container"><button onclick="removeRow(this)">Usuń</button></div>
        </td>
    `;
}

function removeRow(button) {
    const table = document.getElementById("taskTable");
    const row = button.closest("tr");
    table.removeChild(row);
}
