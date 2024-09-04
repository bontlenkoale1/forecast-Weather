function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecast = response.data.daily;
  
    let forecastHTML = `<div class="forecast-row">`;
    forecast.forEach(function(day, index) {
      if (index < 5) {
        forecastHTML += `
          <div class="forecast-day">
            <h3>${formatDay(day.time)}</h3>
            <img src="${day.condition.icon_url}" alt="${day.condition.description}" />
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(day.temperature.maximum)}°C</span>
              <span class="forecast-temperature-min">${Math.round(day.temperature.minimum)}°C</span>
            </div>
          </div>
        `;
      }
    });
  
    forecastHTML += `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
    return days[day];
  }
  
  function search(event) {
    event.preventDefault();
    const searchInputElement = document.querySelector("#search-input");
    const city = searchInputElement.value.trim();
  
    if (city) {
      const apiKey = "0fd2f6d04c480da7a695db3eo9b870t6";
      const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      
      axios.get(apiUrl).then(displayTemperature).catch(handleError);
  
     
      const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
      axios.get(forecastUrl).then(displayForecast).catch(handleError);
    } else {
      alert("Please enter a city name.");
    }
  }
  