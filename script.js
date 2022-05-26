(function () {
  let startCity = 'London';

  const form = document.querySelector('form');
  const inputField = document.querySelector('.inputField');

  function extractWeatherForecats(response) {
    const city = response.name;
    // const city = response.
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
      response.json().then((result) => {
        console.log(result);
      });
    } catch {
      // TODO add error message for user
      console.log('city is not found');
    }
  }

  async function updatePage() {
    const forecast = await getWeatherForecast();
    // console.log('line33');
    // console.log(forecast);
    // const someData = forecast.then(result => console.log(result));
    // console.log(someData);
    // const forecastObject = extractWeatherForecats(forecast);
  }

  getWeatherForecast('London');
  form.addEventListener('submit', updatePage);
})();
