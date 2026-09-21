// ==============================
// TERRAGUARD DASHBOARD
// ==============================


// MAP
const map = L.map("map").setView([27.4, 89.2], 6);


// Map tiles
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// Risk locations
const locations = [
    {
        name: "Gangtok, Sikkim",
        position: [27.3389, 88.6065],
        risk: 78,
        level: "High"
    },

    {
        name: "Cherrapunji, Meghalaya",
        position: [25.2840, 91.7229],
        risk: 65,
        level: "Moderate"
    },

    {
        name: "Tawang, Arunachal Pradesh",
        position: [27.5860, 91.8590],
        risk: 43,
        level: "Moderate"
    },

    {
        name: "Aizawl, Mizoram",
        position: [23.7271, 92.7176],
        risk: 21,
        level: "Low"
    }
];


// Marker colors
function getColor(risk) {

    if (risk >= 75) return "#d64545";

    if (risk >= 50) return "#e77b32";

    if (risk >= 30) return "#e5b83d";

    return "#3eae74";
}


// Add markers
locations.forEach(location => {

    const marker = L.circleMarker(
        location.position,
        {
            radius: 10,
            fillColor: getColor(location.risk),
            color: "#ffffff",
            weight: 3,
            fillOpacity: 0.9
        }
    ).addTo(map);


    marker.bindPopup(`
        <strong>${location.name}</strong>
        <br>
        Risk Score: <b>${location.risk}%</b>
        <br>
        Status: <b>${location.level}</b>
    `);
});


// ==============================
// ANIMATED RISK SCORE
// ==============================

const scoreElement = document.getElementById("riskScore");

let currentScore = 0;
const targetScore = 78;

const animation = setInterval(() => {

    currentScore++;

    scoreElement.textContent = currentScore;

    if (currentScore >= targetScore) {
        clearInterval(animation);
    }

}, 25);


// ==============================
// NAVIGATION
// ==============================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function () {

        document.querySelectorAll("nav a")
            .forEach(item => item.classList.remove("active"));

        this.classList.add("active");

    });

});