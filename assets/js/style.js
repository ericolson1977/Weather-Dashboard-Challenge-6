// alert("working");
var searchButton = document.getElementById("search-btn");

function fetchCurrentWeather (event) {
    var apiKey = "a10bc788276a7c7ca6f89df126f2779a";
    var cityName = document.getElementById("city-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&&appid=" + apiKey;

    event.preventDefault()

    fetch(requestUrl)
        .then(function (response) {
            if (!response.ok) {
                if(response.status === 404) {
                    alert ("City not found. Please ener a valid city name.");
                }
            }
            return response.json();
        })    
        .then(function (data) {
        // console.log(data)
            var cityNameElement = document.getElementById("city-name");
            var iconElement = document.getElementById("weather-icon");
            var tempElement = document.getElementById("temp");
            var windElement = document.getElementById("wind");
            var humidityElement = document.getElementById("humidity");

            var cityName = data.name;
            var icon = data.weather[0].icon;
            var temp = ((data.main.temp * 9) /5 - 459.67).toFixed(2);
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;

            cityNameElement.textContent = cityName;
            iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            iconElement.alt = "Weather Icon";
            tempElement.textContent = "Temp: " + temp + "°F";
            windElement.textContent = "Wind: " + windSpeed + "mph";
            humidityElement.textContent = "Humidity: " + humidity + "%";

            console.log(cityName);
            console.log(icon);
            console.log("Temp: " + temp + "°F");
            console.log("Wind: " + windSpeed + "mph");
            console.log("Humidity: " + humidity + "%")
        });
} 

function fetchForecastData (event) {
    var apiKey = "a10bc788276a7c7ca6f89df126f2779a";
    var cityName = document.getElementById("city-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&&appid=" + apiKey;

    event.preventDefault()

    fetch(requestUrl)
        .then(function (response) {
            if (!response.ok) {
                if(response.status === 404) {
                    alert ("City not found. Please ener a valid city name.");
                }
            }
            return response.json();
        })    
        .then(function (data) {
        // console.log(data)
        // var date = ;
        var cityName = data.name;
        var icon = data.weather[0].icon
        var temp = data.main.temp;
        var windSpeed = data.wind.speed;
        var humidity = data.main.humidity;

        var tempFahrenheit = (temp * 9) /5 - 459.67;

        console.log(cityName);
        console.log(icon);
        console.log("Temp: " + tempFahrenheit + "°F");
        console.log("Wind: " + windSpeed + "mph");
        console.log("Humidity: " + humidity + "%")
        });
} 


searchButton.addEventListener('click', fetchCurrentWeather);
    