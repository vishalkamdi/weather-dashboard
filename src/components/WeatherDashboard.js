import React, { useState, useEffect, useCallback } from "react";
import "./WeatherDashboard.css";
import axios from "axios";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import Favorites from "./Favorites";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("metric"); // Default to Celsius

  useEffect(() => {
    // Fetch favorites from JSON server on component mount
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  // Function to fetch weather data for a city
  const fetchWeather = useCallback(
    async (city, defaultUnit = unit) => {
      const apiKey = "a90b8c6cf69bd213125f907471608171";
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${defaultUnit}&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    },
    [unit]
  );

  // Function to add a city to favorites
  const addFavorite = async (city) => {
    if (
      favorites.some((fav) => fav.name.toLowerCase() === city.toLowerCase())
    ) {
      alert(`${city} is already in your favorites!`);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/favorites", {
        name: city,
      });
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  // Function to remove a city from favorites
  const removeFavorite = async (city) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${city.id}`);
      setFavorites(favorites.filter((fav) => fav.id !== city.id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = useCallback(async () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);

    if (weatherData) {
      // Refetch weather data with the updated unit
      await fetchWeather(weatherData.city.name, newUnit);
    }
  }, [fetchWeather, unit, weatherData]);

  return (
    <div className="dashboard">
      <Search fetchWeather={fetchWeather} unit={unit} setUnit={setUnit} />
      <WeatherDisplay
        weatherData={weatherData}
        addFavorite={addFavorite}
        unit={unit}
        toggleUnit={toggleUnit}
      />
      <Favorites
        favorites={favorites}
        fetchWeather={fetchWeather}
        removeFavorite={removeFavorite}
      />
    </div>
  );
};

export default WeatherDashboard;
