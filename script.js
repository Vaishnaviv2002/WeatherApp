const apiKey = 'e217c57c009d0bede9ac748207b9a8bd'; // Your OpenWeatherMap API key
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const body = document.body;

const cityName = document.getElementById('cityName');
const currentTemp = document.getElementById('currentTemp');
const weatherIcon = document.getElementById('weatherIcon');
const maxTemp = document.getElementById('maxTemp');
const minTemp = document.getElementById('minTemp');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const dateTime = document.getElementById('dateTime');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  fetchWeatherData(city);
});

async function fetchWeatherData(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      updateWeatherInfo(data);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to fetch weather data. Please try again.');
  }
}

function updateWeatherInfo(data) {
  const weather = data.weather[0];
  const main = data.main;
  const wind = data.wind;

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  currentTemp.textContent = `${main.temp.toFixed(1)}°C`;
  maxTemp.textContent = main.temp_max.toFixed(1);
  minTemp.textContent = main.temp_min.toFixed(1);
  windSpeed.textContent = wind.speed.toFixed(1);
  pressure.textContent = main.pressure;
  humidity.textContent = main.humidity;

  // Set weather icon
  const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  weatherIcon.style.backgroundImage = `url(${iconUrl})`;

  // Change background based on weather condition
  setBackground(weather.main);

  // Display the current date and time
  displayDateTime();

  // Show the weather info section
  weatherInfo.classList.remove('hidden');
}

// Function to display current date and time
function displayDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = now.toLocaleDateString(undefined, options);
  const time = now.toLocaleTimeString();

  dateTime.textContent = `${date} | ${time}`;
}

// Function to change background based on weather condition
function setBackground(weatherCondition) {
  let backgroundImage;

  switch (weatherCondition.toLowerCase()) {
    case 'clear':
      backgroundImage = 'url("https://your-actual-image-url/sunny.jpg")'; // Replace with your sunny image URL
      break;
    case 'rain':
      backgroundImage = 'url("https://your-actual-image-url/rainy.jpg")'; // Replace with your rainy image URL
      break;
    case 'clouds':
      backgroundImage = 'url("https://your-actual-image-url/cloudy.jpg")'; // Replace with your cloudy image URL
      break;
    default:
      backgroundImage = 'url("https://your-actual-image-url/default.jpg")'; // Default image if no match
  }

  body.style.backgroundImage = backgroundImage;
}

// Update the time every second
setInterval(displayDateTime, 1000);
