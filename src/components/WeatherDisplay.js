import React, { useCallback } from "react";

const WeatherDisplay = ({ weatherData, unit, addFavorite, toggleUnit }) => {
  const celsiusToFahrenheit = useCallback(
    (celsius) => (celsius * 9) / 5 + 32,
    []
  );

  const getDailyForecast = useCallback((list) => {
    const dailyForecast = [];
    const usedDates = new Set();

    for (let i = 0; i < list.length; i++) {
      const date = new Date(list[i].dt * 1000);
      const dateStr = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      if (!usedDates.has(dateStr)) {
        dailyForecast.push({
          date: dateStr,
          temp: list[i].main.temp,
          description: list[i].weather[0].description,
          icon: list[i].weather[0].icon,
        });
        usedDates.add(dateStr);
      }

      if (dailyForecast.length === 5) break;
    }

    return dailyForecast;
  }, []);

  if (!weatherData) return <p>Please search for a city.</p>;

  const currentTemp =
    unit === "metric"
      ? weatherData.list[0].main.temp
      : celsiusToFahrenheit(weatherData.list[0].main.temp);

  const dailyForecast = getDailyForecast(weatherData.list);

  return (
    <div className="weather-display">
      <button onClick={() => toggleUnit()}>
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>
      <h2>{weatherData.city.name}</h2>
      <p>
        Temperature: {currentTemp.toFixed(2)}°{unit === "metric" ? "C" : "F"}
      </p>

      <button
        onClick={() => addFavorite(weatherData.city.name)}
        className="favorite-btn"
      >
        Add to Favorites
      </button>

      <h3>5-Day Forecast:</h3>
      {dailyForecast.length === 0 ? (
        <p>No forecast data available.</p>
      ) : (
        <ul className="forecast-list">
          {dailyForecast.map((day, index) => {
            const temp =
              unit === "metric" ? day.temp : celsiusToFahrenheit(day.temp);

            return (
              <li key={index} className="forecast-item">
                <p>{day.date}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                />
                <p>
                  Temp: {temp.toFixed(1)}°{unit === "metric" ? "C" : "F"}
                </p>
                <p>{day.description}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default WeatherDisplay;
