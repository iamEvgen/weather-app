(function () {
  let startCity = 'London';

  //FORM
  const form = document.querySelector('form');
  const inputField = document.querySelector('.inputField');

  //DATA FOR USER
  const cityForUser = document.querySelector('.city');
  const temperature = document.querySelector('.temperature');
  const feelsLike = document.querySelector('.feelsLike');
  const weatherIcon = document.querySelector('.weatherIcon');
  const windSpeed = document.querySelector('.windSpeed');
  const humidity = document.querySelector('.humidity');
  const pressure = document.querySelector('.pressure');

  function extractWeatherForecats(response) {
    const city = response.name;
    const temp = Math.round(response.main.temp - 273.15);
    const feelsLike = Math.round(response.main['feels_like'] - 273.15);
    const pressure = response.main.pressure;
    const weatherMain = response.weather[0].main;
    const weatherDescription = response.weather[0].description;
    const icon = response.weather[0].icon;
    const windSpeed = response.wind.speed;
    const humidity = response.main.humidity;
    return {
      city,
      temp,
      feelsLike,
      pressure,
      weatherMain,
      weatherDescription,
      icon,
      windSpeed,
      humidity,
    };
  }

  function resetForm() {
    inputField.value = '';
  }

  async function getWeatherForecast() {
    const apiKey = '00b18f9e9ee81d61cd05778ae304e07f';
    const city = inputField.value || startCity;
    startCity = '';
    if (city === '') return;
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`
      );
      return response.json();
    } catch {
      // TODO add error message for user
      console.log('city is not found');
    }
  }

  function renderForecast(forecastObject) {
    cityForUser.textContent = forecastObject.city;
    temperature.textContent = forecastObject.temp;
    feelsLike.textContent = forecastObject.feelsLike;
    windSpeed.textContent = forecastObject.windSpeed;
    humidity.textContent = forecastObject.humidity;
    pressure.textContent = forecastObject.pressure;
  }

  async function updatePage() {
    const forecast = await getWeatherForecast();
    console.log(forecast);
    const forecastObject = extractWeatherForecats(forecast);
    renderForecast(forecastObject);
    resetForm();
  }

  // getWeatherForecast('London');
  updatePage();
  form.addEventListener('submit', updatePage);
})();
