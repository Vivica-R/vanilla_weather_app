//Time & Day
function timeAndDay() {
    let now = new Date();

    let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    let day = days[now.getDay()];

    let hours = now.getHours();
    if (hours <= 10) {
        hours = `0${hours}`;
    }

    let minutes = now.getMinutes();
    if (minutes <= 10) {
        minutes = `0${minutes}`;
    }

    console.log(day);
    console.log(hours);
    console.log(minutes);
    
    let currentDay = document.querySelector("#day");
    currentDay.innerHTML = day;

    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${hours}:${minutes}`;
}

timeAndDay(); 

//Forecast Days
function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day}`;
}


//Forecast Part 2
function showForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 1; index <= 5; index++) {
        forecast = response.data.daily[index];
        forecastElement.innerHTML += `            
        <hr />
        <div class="row">
            <div class="col-8">${formatDay(forecast.dt*1000)}</div>
            <div class="col-2"><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}" id="forecast-icon"/></div>
            <div class="col-1">${Math.round(forecast.temp.max)}°</div> 
            <div class="col-1">${Math.round(forecast.temp.min)}°</div>
        </div>`
        
    }


}


//Search
function showTemperature(response) {
    console.log(response.data);

    let temperature = Math.round(response.data.main.temp);
    let description = (response.data.weather[0].description);
    let humidity = Math.round(response.data.main.humidity);
    let wind = Math.round(response.data.wind.speed);
    console.log(temperature);
    console.log(description);
    console.log(humidity);
    console.log(wind);

    let temperatureNow = document.querySelector("#temperature");
    temperatureNow.innerHTML = temperature

    let weatherDescription = document.querySelector("#description");
    weatherDescription.innerHTML = description

    let humidityNow = document.querySelector("#humidity");
    humidityNow.innerHTML = humidity;

    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = wind;

    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    //Forecast Part 1
    let lat = (response.data.coord.lat);
    let lon = (response.data.coord.lon);
    console.log(lat);
    console.log(lon);

    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely&appid=68c5c1062569a9e686bff1d72332375f&units=metric`;
    axios.get(apiUrl).then(showForecast);

    //Convert to Fahrenheit
    function convertToFahrenheit(event) {
        event.preventDefault();
        let fahrenheitTemperature = document.querySelector("#temperature");
        fahrenheitTemperature.innerHTML = Math.round((temperature*9)/5+32);
    }

    let fahrenheit = document.querySelector("#fahrenheit-link");
    fahrenheit.addEventListener("click", convertToFahrenheit);

    //Convert to Celsius
    function convertToCelsius(event) {
        event.preventDefault();
        let celsiusTemperature = document.querySelector("#temperature");
        celsiusTemperature.innerHTML = temperature;
    }


    let celsius = document.querySelector("#celsius-link");
    celsius.addEventListener("click", convertToCelsius);
}

function search(city) {
    let apiKey = "68c5c1062569a9e686bff1d72332375f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-city-input");
    search(searchInput.value);

    let h1 = document.querySelector("h1");
    h1.innerHTML = `${searchInput.value}`;
    
}

let form = document.querySelector("#search-form");
form.addEventListener ("submit", handleSubmit);

search("Graz");

