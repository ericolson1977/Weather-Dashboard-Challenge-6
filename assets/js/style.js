var searchButton = document.getElementById("search-btn");
var displaySection = document.getElementById("display");
var forecastContainer = document.querySelector(".five-day-forecast");

// this function gets the current weather data from a city from the search box or from the previous searches
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
        });
}

// this function gets the 5 day forecast from a city from the search box or from the previous searches
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
            forecastContainer.innerHTML = "";

            var filteredObjects = data.list.filter(function (item) {
                return item.dt_txt.endsWith("15:00:00");

            });

            var firstFiveObjects = filteredObjects.slice(0, 5);

            firstFiveObjects.forEach(function (targetObject, index) {

                var forecastDiv = document.createElement("div");
                var forecastList = document.createElement("ul");
                var forecastListItem1 = document.createElement("li");
                var forecastListItem2 = document.createElement("li");
                var forecastListItem3 = document.createElement("li");
                var forecastListItem4 = document.createElement("li");
                var forecastListItem5 = document.createElement("li");
                var weatherIcon = document.createElement("img")
                var forecastIcon = targetObject.weather[0].icon;

                forecastDiv.classList.add("card-column");
                forecastList.classList.add('five-day-details');
                forecastListItem1.classList.add("five-day-item");
                forecastListItem2.classList.add("five-day-item");
                forecastListItem3.classList.add("five-day-item");
                forecastListItem4.classList.add("five-day-item");
                forecastListItem5.classList.add("five-day-item");

                var timestamp = targetObject.dt;
                var formattedDate = dayjs.unix(timestamp).format("MMM DD, YYYY");

                forecastListItem1.textContent = "Date: " + formattedDate;
                var iconUrl = "https://openweathermap.org/img/wn/" + forecastIcon + ".png"
                forecastListItem3.textContent = "Temp: " + ((targetObject.main.temp * 9) / 5 - 459.67).toFixed(2) + "°F";
                forecastListItem4.textContent = "Wind: " + targetObject.wind.speed + "mph";
                forecastListItem5.textContent = "Humidity: " + targetObject.main.humidity + "%";
                weatherIcon.setAttribute("src", iconUrl)
                forecastListItem2.append(weatherIcon);

                forecastList.append(forecastListItem1);
                forecastList.append(forecastListItem2);
                forecastList.append(forecastListItem3);
                forecastList.append(forecastListItem4);
                forecastList.append(forecastListItem5);
                forecastDiv.append(forecastList)
                forecastContainer.append(forecastDiv);
            });
        });
}

// this fucntion stores the city input in the searach box to local storage
function saveSearch(city) {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    }

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// this function renders the previous searches from local storage into a list of clickable buttons
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

// evetn listnener to capture the click on the search button
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    fetchCurrentWeather(event);
    fetchForecastData(event);
    document.getElementById("city-input").value = "";
})

// this calls the renderSearchHistory as the page loads to have the previous searches persist on the page
renderSearchHistory()