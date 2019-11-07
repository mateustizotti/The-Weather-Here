// geolocate
let lat, lon;

if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat.toFixed(3);
            document.getElementById('longitude').textContent = lon.toFixed(3);
            const api_url = `weather/${lat}, ${lon}`;
            const response = await fetch(api_url)
            const json = await response.json();
            const weather = json.weather.currently;
            const air = json.air_quality.results[0].measurements[0];
            const temp = (weather.temperature);
            const summary = weather.summary;
            const parameters = air.parameter;
            const value = air.value;
            const units = air.unit;
            const date = air.lastUpdated;
            document.getElementById('temp').textContent = temp;
            document.getElementById('summary').textContent = summary;
            document.getElementById('aq_parameters').textContent = parameters;
            document.getElementById('aq_value').textContent = value;
            document.getElementById('aq_units').textContent = units;
            document.getElementById('aq_data').textContent = date;

            const data = { lat, lon, weather, air };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const db_response = await fetch('/api', options);
            const db_json = await db_response.json();
            console.log(db_json);

        } catch (error) {
            console.error(error);
        }
    });
} else {
    console.log('geolocation not available');
}
