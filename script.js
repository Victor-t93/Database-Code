document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('driverForm').addEventListener('submit', handleDriverFormSubmit);
    document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);

    initializeMap();
});

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function handleDriverFormSubmit(event) {
    event.preventDefault();

    const driverName = document.getElementById('driverName').value;
    const wasteType = document.getElementById('wasteType').value;
    const households = document.getElementById('households').value;

    const tableBody = document.getElementById('adminTableBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${driverName}</td>
        <td>${wasteType}</td>
        <td>${households}</td>
        <td><button onclick="editRecord(this)">Edit</button> <button onclick="deleteRecord(this)">Delete</button></td>
    `;

    tableBody.appendChild(newRow);

    document.getElementById('driverForm').reset();
}

function handleAdminLogin(event) {
    event.preventDefault();

    const employeeNumber = document.getElementById('employeeNumber').value;
    const adminPassword = document.getElementById('adminPassword').value;

    // Example hard-coded credentials for demonstration purposes
    const validCredentials = {
        employeeNumber: 'admin123',
        adminPassword: 'password'
    };

    if (employeeNumber === validCredentials.employeeNumber && adminPassword === validCredentials.adminPassword) {
        showSection('admin');
    } else {
        alert('Invalid employee number or password');
    }

    document.getElementById('adminLoginForm').reset();
}

function editRecord(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    document.getElementById('driverName').value = cells[0].innerText;
    document.getElementById('wasteType').value = cells[1].innerText;
    document.getElementById('households').value = cells[2].innerText;

    row.remove();
}

function deleteRecord(button) {
    button.closest('tr').remove();
}

function initializeMap() {
    const map = L.map('mapid').setView([1.3733, 32.2903], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Uganda boundary data
    const ugandaBoundary = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [29.579466, -1.341237],
                    [29.587838, -1.341237],
                    [29.587838, -1.331462],
                    [29.579466, -1.331462],
                    [29.579466, -1.341237]
                ]
            ]
        }
    };

    L.geoJSON(ugandaBoundary, {
        style: function (feature) {
            return {color: 'red'};
        }
    }).addTo(map);
}
