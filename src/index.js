function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#current-city");
    let humidityElement = document.querySelector("#current-humidity");
    let windElement = document.querySelector("#current-wind");
    let descriptionElement = document.querySelector("#weather-description");
    let iconElement = document.querySelector("#weather-icon");
  
    let temperature = Math.round(response.data.temperature.current);
    let humidity = response.data.temperature.humidity; 
    let windSpeed = response.data.wind.speed;
    let description = response.data.condition.description;
    let iconUrl = response.data.condition.icon_url; 
  
    cityElement.textContent = response.data.city;
    temperatureElement.textContent = temperature;
    humidityElement.textContent = `${humidity}%`;
    windElement.textContent = `${windSpeed} m/s`;
    descriptionElement.textContent = description;
    iconElement.src = iconUrl; 
  }
  
  function handleError(error) {
    console.error("Error fetching the weather data:", error);
    alert("Sorry, we couldn't find the city. Please try again.");
  }
  
  function search(event) {
    event.preventDefault();
    const searchInputElement = document.querySelector("#search-input");
    const city = searchInputElement.value.trim();
  
    if (city) {
      const apiKey = "0fd2f6d04c480da7a695db3eo9b870t6";
      const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
      axios.get(apiUrl).then(displayTemperature).catch(handleError);
    } else {
      alert("Please enter a city name.");
    }
  }
  
  function formatDate(date) {
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const formattedDay = days[date.getDay()];
  
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  const searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  const currentDateElement = document.querySelector("#current-date");
  const currentDate = new Date();
  
  currentDateElement.textContent = formatDate(currentDate);

  function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHTML = "<div class='weather-forecast'>";
  
    
    days.forEach(function(day) {
        forecastHTML += `
          <div class="forecast-day">
         <div class="forecast-date">${day}</div>
         <div class="forecast-icon">⛅</div>
         <div class="forecast-temperatures">
         <div class="forecast-temperature">
         <strong>15℃ </strong>
         </div><br />
         <div class="forecast-temperature">9℃</div>
         </div>
         </div>
        `;
    });
    forecastHTML += "</div>";
    forecastElement.innerHTML = forecastHTML;
  }
  displayForecast();