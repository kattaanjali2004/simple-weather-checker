const apikey = "80bc0a919aef30c2d0d17f713c4d4a33";
const card = document.querySelector(".card");

document.addEventListener("DOMContentLoaded", () => {
  const weatherForm = document.querySelector(".weatherForm");
  const cityInput = document.querySelector(".cityInput");

  if (!weatherForm) {
    //console.error("Form not found!");
    return;
  }

  weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    let city = cityInput.value.trim();  // Trim input

    if (city) {
      try {
        const weatherData = await getweatherData(city);
        displayweatherInfo(weatherData);
      } catch (error) {
        console.error(error); 
        displayError("Could not fetch weather data.");
      }
    } else {
      displayError("Please enter a city.");
    }    
  });
});

async function getweatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    thrownewError("Could not fetch weather data");
  }
  return await response.json();
}

function displayweatherInfo(weatherData) {
  card.innerHTML = ""; // clear previous content
  card.style.display = "flex";

  const cityName = weatherData.name;
  const temp = Math.round(weatherData.main.temp);
  const desc = weatherData.weather[0].description;
  const humidity = weatherData.main.humidity;
  const emoji = getweatherEmoji(weatherData.weather[0].main);

  const cityDisplay = document.createElement("h1");
  cityDisplay.textContent = cityName;
  cityDisplay.classList.add("cityDisplay");

  const tempDisplay = document.createElement("p");
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  tempDisplay.classList.add("tempDisplay");

  const descDisplay = document.createElement("p");
  descDisplay.textContent = desc;
  descDisplay.classList.add("descDisplay");

  const humidityDisplay = document.createElement("p");
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  humidityDisplay.classList.add("humidityDisplay");

  const emojiDisplay = document.createElement("p");
  emojiDisplay.textContent = emoji;
  emojiDisplay.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(emojiDisplay);
  card.appendChild(descDisplay);
  card.appendChild(humidityDisplay);
}

function getweatherEmoji(weatherMain) {
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return "☀️";
    case "clouds":
      return "☁️";
    case "rain":
      return "🌧️";
    case "thunderstorm":
      return "⛈️";
    case "snow":
      return "❄️";
    case "mist":
    case "fog":
      return "🌫️";
    default:
      return "🌈";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.innerHTML = ""; // Clear the card before showing the error
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}