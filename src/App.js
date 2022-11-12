import "./styles/Global.css";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/Current Weather/CurrentWeather";
import {
  weatherApiURL,
  weatherApiKey,
  forecastURL,
} from "./components/ApiData";
import { useState } from "react";
import Forecast from "./components/Forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  let handleSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherApiURL}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
    );
    const forecastFetch = fetch(
      `${forecastURL}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])

      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();


        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <img src="./go-logo.png" alt="logo" className="logo" />
      <Search onSearchChange={handleSearchChange} />
      {currentWeather &&  <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
