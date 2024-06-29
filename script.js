document.addEventListener('DOMContentLoaded', function () {
    // Show the initial section
    showSection('home');

    // Event listener for driver form submission
    document.getElementById('driverForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const driverName = document.getElementById('driverName').value;
        const wasteType = document.getElementById('wasteType').value;
        const households = document.getElementById('households').value;

        // Handle form submission (e.g., send data to server, update UI)
        console.log(`Driver: ${driverName}, Waste Type: ${wasteType}, Households: ${households}`);

        // Add driver to schedule form dropdown
        const driverDropdown = document.getElementById('driver');
        const option = document.createElement('option');
        option.value = driverName;
        option.innerText = driverName;
        driverDropdown.appendChild(option);

        // Reset form
        document.getElementById('driverForm').reset();
    });

    // Event listener for admin login form submission
    document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const employeeNumber = document.getElementById('employeeNumber').value;
        const adminPassword = document.getElementById('adminPassword').value;

        // Handle login (e.g., validate credentials, update UI)
        console.log(`Employee Number: ${employeeNumber}, Password: ${adminPassword}`);

        // Reset form
        document.getElementById('adminLoginForm').reset();
    });

    // Schedule Management
    document.getElementById('scheduleForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const area = document.getElementById('area').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const vehicle = document.getElementById('vehicle').value;
        const driver = document.getElementById('driver').value;

        // Add schedule to table (or send to server)
        const scheduleTableBody = document.getElementById('scheduleTableBody');
        const row = scheduleTableBody.insertRow();
        row.insertCell(0).innerText = area;
        row.insertCell(1).innerText = date;
        row.insertCell(2).innerText = time;
        row.insertCell(3).innerText = vehicle;
        row.insertCell(4).innerText = driver;

        // Reset form
        document.getElementById('scheduleForm').reset();
    });

    // Vehicle Management
    document.getElementById('vehicleForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const vehicleName = document.getElementById('vehicleName').value;
        const vehicleStatus = document.getElementById('vehicleStatus').value;

        // Add vehicle to table (or send to server)
        const vehicleTableBody = document.getElementById('vehicleTableBody');
        const row = vehicleTableBody.insertRow();
        row.insertCell(0).innerText = vehicleName;
        row.insertCell(1).innerText = vehicleStatus;

        // Reset form
        document.getElementById('vehicleForm').reset();

        // Add vehicle to schedule form dropdown
        const vehicleDropdown = document.getElementById('vehicle');
        const option = document.createElement('option');
        option.value = vehicleName;
        option.innerText = vehicleName;
        vehicleDropdown.appendChild(option);
    });

    // Search functionality
    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const query = document.getElementById('searchQuery').value;
        // Implement search functionality here
        console.log(`Search query: ${query}`);
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Handle contact form submission (e.g., send data to server, show confirmation)
        console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

        // Reset form
        document.getElementById('contactForm').reset();
    });

    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Handle login form submission (e.g., validate credentials, show confirmation)
        console.log(`Username: ${username}, Password: ${password}`);

        // Reset form
        document.getElementById('loginForm').reset();
    });

    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        // Handle register form submission (e.g., create new user, show confirmation)
        console.log(`Username: ${username}, Password: ${password}`);

        // Reset form
        document.getElementById('registerForm').reset();
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.container > section').forEach(function (section) {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Google Maps initialization
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 12
            });
            const marker = new google.maps.Marker({
                position: pos,
                map: map
            });
        }, function () {
            handleLocationError(true, map.getCenter());
        });
    } else {
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 12
    });
    const infoWindow = new google.maps.InfoWindow({
        position: pos,
        map: map
    });
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
