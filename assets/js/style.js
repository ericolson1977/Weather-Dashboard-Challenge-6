// alert("working");
var searchButton = document.getElementById("search-btn");
var displaySection = document.getElementById("display")

function fetchCurrentWeather(event) {
    var apiKey = "a10bc788276a7c7ca6f89df126f2779a";
    var cityName = document.getElementById("city-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&&appid=" + apiKey;

    event.preventDefault()

    fetch(requestUrl)
        .then(function (response) {
            if (!response.ok) {
                if (response.status === 404) {
                    alert("City not found. Please ener a valid city name.");
                }
                displaySection.style.display = "none";
            } else {
                displaySection.style.display = "block";
                saveSearch(cityName);

                renderSearchHistory();
            }
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            var cityNameElement = document.getElementById("city-name");
            var currentDateElement = document.getElementById("current-date")
            var iconElement = document.getElementById("weather-icon");
            var tempElement = document.getElementById("temp");
            var windElement = document.getElementById("wind");
            var humidityElement = document.getElementById("humidity");

            var cityName = data.name;
            var today = dayjs()
            var icon = data.weather[0].icon;
            var temp = ((data.main.temp * 9) / 5 - 459.67).toFixed(2);
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;

            cityNameElement.textContent = cityName;
            currentDateElement.textContent = today.format('(MMM DD, YYYY)');
            iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            iconElement.alt = "Weather Icon";
            tempElement.textContent = "Temp: " + temp + "°F";
            windElement.textContent = "Wind: " + windSpeed + "mph";
            humidityElement.textContent = "Humidity: " + humidity + "%";

            // console.log(cityName);
            // console.log(icon);
            // console.log("Temp: " + temp + "°F");
            // console.log("Wind: " + windSpeed + "mph");
            // console.log("Humidity: " + humidity + "%")
        });
}

function fetchForecastData() {
    var apiKey = "a10bc788276a7c7ca6f89df126f2779a";
    var cityName = document.getElementById("city-input").value;
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

    fetch(fiveDayUrl)
        .then(function (response) {
            if (!response.ok) {

            }
            return response.json();
        })
        .then(function (data) {

            var filteredObjects = data.list.filter(function (item) {
                return item.dt_txt.endsWith("15:00:00");

            });
            
            var firstFiveObjects = filteredObjects.slice(0, 5);
            console.log(firstFiveObjects);
            firstFiveObjects.forEach(function (targetObject, index) {

                var forecastDateElement = document.getElementById("forecast-date-" + index);
                var forecastIconElement = document.getElementById("forecast-icon-" + index);
                var forecastTempElement = document.getElementById("forecast-temp-" + index);
                var forecastWindElement = document.getElementById("forecast-wind-" + index);
                var forecastHumidityElement = document.getElementById("forecast-humidity-" + index);

                var forecastDate = targetObject.dt_txt;
                var forecastIcon = targetObject.weather[0].icon;
                var forecastTemp = ((targetObject.main.temp * 9) / 5 - 459.67).toFixed(2);
                var forecastWindSpeed = targetObject.wind.speed;
                var forecastHumidity = targetObject.main.humidity;

                console.log(forecastDate);
                console.log(forecastIcon);
                console.log("Temp: " + forecastTemp + "°F");
                console.log("Wind: " + forecastWindSpeed + "mph");
                console.log("Humidity: " + forecastHumidity + "%")

                // forecastDateElement.textContent = forecastDate;
                // forecastIconElement.src = "https://openweathermap.org/img/wn/" + forecastIcon + ".png";
                // forecastIconElement.alt = "Weather Icon";
                // forecastTempElement.textContent = "Temp: " + forecastTemp + "°F";
                // forecastWindElement.textContent = "Wind: " + forecastWindSpeed + "mph";
                // forecastHumidityElement.textContent = "Humidity: " + forecastHumidity + "%";

            });
        });
}

function saveSearch(city) {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    }

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    // console.log(searchHistory);

}

function renderSearchHistory() {
    var searchHistoryContainer = document.querySelector(".search-history");
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    searchHistoryContainer.innerHTML = "";

    searchHistory.forEach(function (city) {
        var button = document.createElement("button");
        button.textContent = city;
        button.classList.add("btn", "btn-secondary", "btn-grey");

        button.addEventListener("click", function () {
            document.getElementById("city-input").value = city;
            fetchCurrentWeather(event);
            fetchForecastData(event);
            document.getElementById("city-input").value = "";
        });

        searchHistoryContainer.appendChild(button);
    });
}

searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    fetchCurrentWeather(event);
    fetchForecastData(event);
    document.getElementById("city-input").value = "";
})

renderSearchHistory()