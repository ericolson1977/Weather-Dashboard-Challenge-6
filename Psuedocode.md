# 06 Server-Side APIs: Weather Dashboard Psuedo

1. Setup HTML structure for the page, initialize JS variables
    - create layout sections for the search from, current weather data, forecast data, search history list  -- DONE
    - Define Api_key variable for the openweather API -- DONE
    - Define base URL for the openwather API -- DONE
    - Create variables to store references to HTML elements (e.g, searchForm, cityInput, currentWeatherContainer, forecastContainer, searchHistoryContainer) -- DONE

2. Event Listener for form submission 
    - Add submit event listener to searchForm element --DONE
    - prevent the default form submission -- DONE
    - Get the users input from cityInput element -- DONE
    - call a function (e.g, fetchWeatherData) with the user's input --DONE

3. Fetch weather data from OpenWeather API (fetchWeatherData function)
    - construct the API URL using the users input and API Key -- DONE
    - fetch data from the API using the constructed URL -- DONE
    - parse the JSON response -- DONE
    - Handle errors (e.g, if the city is not found) -- DONE

4. Display the current weather conditions (displayCurrentWeather function)
    - Extract relevant data from the API response (city name, date, icon, temp, humidity, and wind speed) -- DONE
    - Create HTML elements to display this data -- DONE
    - Update the currentWeatherContainer with the HTML elements -- DONE

5. Display 5-day forecast (displayForecast function)
    - 5 day forecast requires lat and long, so we need to fiure out how to extract lat and long from our currentWeather response -- DONE
    - Extract the 5-day forecast data from the API response -- DONE
    - Loop through the forecast data and for each, create HTML elements to display (date, icon, temp, wind speed, humidity) -- DONE
    - Append these to forecastContainer -- DONE

6. Update search history (updateSearchHistory function)
    - Add the searched City to the searchHistory array -- DONE
    - Store the searchHistory array in local storage (setItem) -- DONE

7. Display search history (displaySearchHistory function)
    - Loop through the searchHistory array and create a clickable list of cities in the seachHistoryContainer --DONE
    - Add event listeners to the list of items to allow users to click and view data for a previous search --DONE

8. Event listener for search history 
    - Add a click event listener to the searchHistoryContainer -- DONE
    - When a city is clicked call the fetchWeatherData function with the selected city -- DONE

9. Initial page load
    - Load the search history from local storage and display using displaySearchHistory function -- DONE
