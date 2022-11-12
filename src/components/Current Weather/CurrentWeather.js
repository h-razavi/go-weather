import "./CurrentWeather.css";

export default function CurrentWeather(props) {
  const weatherData = props.data;
  return (
    <div className="weather">
      <div className="top">
      <div className="info">
        <p className="city">{weatherData.city}</p>
        <p className="description">{weatherData.weather[0].description}</p>
      </div>
      <img src={`/icons/${weatherData.weather[0].icon}.png`} alt="weather icon" className="icon" />
      </div>
      <div className="bottom">
        <p className="temprature">{Math.round(weatherData.main.temp)}°C</p>
        <div className="details">
            <div className="parameter-row">
                <span className="parameter-label main-label">Details</span>
            </div>
            <div className="parameter-row">
                <span className="parameter-label">Feels Like</span>
                <span className="parameter-value">{Math.round(weatherData.main.feels_like)}°C</span>
            </div>
            <div className="parameter-row">
                <span className="parameter-label">Wind</span>
                <span className="parameter-value">{Math.ceil(weatherData.wind.speed)} m/s</span>
            </div>
            <div className="parameter-row">
                <span className="parameter-label">Humidity</span>
                <span className="parameter-value">{weatherData.main.humidity}%</span>
            </div>
            <div className="parameter-row">
                <span className="parameter-label">Pressure</span>
                <span className="parameter-value">{Math.floor(weatherData.main.pressure)} Pa</span>
            </div>
        </div>
      </div>
    </div>
  );
}
