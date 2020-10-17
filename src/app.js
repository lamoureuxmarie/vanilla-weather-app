//Date

let now = new Date();
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#current-time");

currentTime.innerHTML = `Last updated: ${day}, ${hours}:${minutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let formatdate = new Date(timestamp);
  let day = days[formatdate.getDay()];
  return `${day}`;
  }


// Real-time Weather

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityPercent = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidityPercent}%`;
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  windElement.innerHTML = `Wind: ${windSpeed}km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// Forecast

function displayHourlyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        ${Math.round(forecast.main.temp)}°
      </div>
    </div>
  `;
  }
}

function displayDailyForecast(response) {
  let forecastDays = document.querySelector("#daily-forecast");
  forecastDays.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 40; index += 7) {
    forecast = response.data.list[index];
    forecastDays.innerHTML += ` 
    <div class="col-2">
      <h3>
     ${formatForecastDay(forecast.dt * 1000)}
     </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
    <div class="weather-forecast-temperature"> <strong>
    ${Math.round(forecast.main.temp_max)}° </strong> ${Math.round(
      forecast.main.temp_min
    )}°</div></div>`;
  }
}

//Change City

function search(city) {
let apiKey = "666e992c8bf5317be35ba26eb820d6ec";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemp);
apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(displayHourlyForecast);
axios.get(apiUrl).then(displayDailyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//Current Location

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=666e992c8bf5317be35ba26eb820d6ec&units=metric`;
  axios.get(url).then(displayTemp);
  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=666e992c8bf5317be35ba26eb820d6ec&units=metric`;
  axios.get(url).then(displayHourlyForecast);
  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=666e992c8bf5317be35ba26eb820d6ec&units=metric`;
  axios.get(url).then(displayDailyForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#current-location-btn");
locationButton.addEventListener("click", getCurrentLocation);


// Convert to Fahrenheit

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);


search("Berlin");