// Temperature API
let apiKey = "a2dda52dce059eb8a14e95aaa0db6ab7";

function showTemperature(response) {
  let T = document.querySelector("#currTemp");
  T.innerHTML = response.data.main.temp;
}

// search city
function clickedBtn(_event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city");
  let searchdCity = document.querySelector("#city-input");
  //console.log(searchdCity.value);
  currentCity.innerHTML = searchdCity.value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchdCity.value}&units=metric&appid=${apiKey}`
    )
    .then(showTemperature);
}
function handleInput(_event) {
  let searchCity = document.querySelector("#city-input").value;
  let currentCity = document.querySelector("#city");
  console.log(searchCity);
  currentCity.innerHTML = searchCity;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&appid=${apiKey}`
    )
    .then(showTemperature);
}

let btnSearch = document.querySelector("#searchBtn");
btnSearch.addEventListener("click", clickedBtn);
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleInput);

//date
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
let dayTime = document.querySelector("#time");

dayTime.innerHTML = `${day}, ${hour}:${minute}`;

//temperature conversion
function convert2C(_event) {
  event.preventDefault();
  let T = document.querySelector("#currTemp");
  T.innerHTML = "19";
}
function convert2F(_event) {
  event.preventDefault();
  let T = document.querySelector("#currTemp");
  T.innerHTML = "66";
}
let linkC = document.querySelector("#celsius-link");
let linkF = document.querySelector("#farenheit-link");
linkF.addEventListener("click", convert2F);
linkC.addEventListener("click", convert2C);

//Geolocation API
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showLocation);
}

function clickedLocationBtn(_event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function showLocation(response) {
  let text = document.querySelector("#currentLocText");
  let loc = response.data.name;
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let temperature = Math.round(response.data.main.temp);
  text.innerHTML = `You are in ${loc} at the latitute ${lat}° and longitude ${lon}° and the current temperature is ${temperature} ° C.`;
}

let btnLocation = document.querySelector("#locationBtn");
btnLocation.addEventListener("click", clickedLocationBtn);
