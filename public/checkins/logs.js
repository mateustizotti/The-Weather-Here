getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const txt = `Here at ${item.lat}, ${item.lat} the weather is ${item.weather.summary} with a temperature of ${item.weather.temperature}°C. The
        concentration of particulate matter (${item.air.parameter}) is ${item.air.value} ${item.air.unit} last read on ${item.air.lastUpdated}.`
        const marker = L.marker([item.lat, item.lon]);
        marker.addTo(map).bindPopup(txt);
    }
}

const map = L.map('map').setView([20, 0], 2);
const attribution = '&copy: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);