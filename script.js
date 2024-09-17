const apiUrl = 'http://localhost:5000/current/city/';
const mapUrl = "https://maps.google.com/maps?t=&z=9&ie=UTF8&iwloc=&output=embed&q="

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const uvElement = document.getElementById('uv');
const windElement = document.getElementById('wind');
const descriptionElement = document.getElementById('description');
const imgElement = document.getElementById('weather-img');
const containerElement = document.getElementById('weather-container');
const mapElement = document.getElementById('gmap_canvas');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}${location}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C (Feels like: ${data.current.feelslike_c}°C)`;
            descriptionElement.textContent = data.current.condition.text;
            humidityElement.textContent = `${data.current.humidity} %`;
            uvElement.textContent = `${data.current.uv}`;
            windElement.textContent = `${data.current.wind_kph} km/h`;
            imgElement.src = `https:${data.current.condition.icon}`;
            mapElement.src = `${mapUrl}${data.location.lat},${data.location.lon}`
            containerElement.style.visibility = "visible";
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}