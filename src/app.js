//Date

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#current-time");

currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

//Change City

function showCity(event) {
  event.preventDefault();
  let changeName = document.querySelector(".change-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${changeName.value}`;
}

let search = document.querySelector(".search-bar");
search.addEventListener("submit", showCity);

// Real-time Weather

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  description.innerHTML = weatherDescription;
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windSpeed} km/h`;
  let humidityPercent = response.data.main.humidity;
  let humidity = document.querySelector("#precipitation");
  humidity.innerHTML = `${humidityPercent}%`;
}

function displayCity(event) {
  event.preventDefault();
  let displayCity = document.querySelector("#change-city");
  let city = displayCity.value;
  let units = "metric";
  let apiKey = "666e992c8bf5317be35ba26eb820d6ec";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

search.addEventListener("submit", displayCity);

d;

// Current Location weather

function showCurrentTemp(response) {
  let currentCity = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = currentCity;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  description.innerHTML = weatherDescription;
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windSpeed} km/h`;
  let humidityPercent = response.data.main.humidity;
  let humidity = document.querySelector("#precipitation");
  humidity.innerHTML = `${humidityPercent}%`;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=666e992c8bf5317be35ba26eb820d6ec&units=metric`;
  axios.get(url).then(showCurrentTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentLocation);

// Convert to Celsius/ Fahrenheit

// Change icons

// Forecast
