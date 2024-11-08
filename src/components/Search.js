import React, { useCallback, useState } from "react";

const Search = ({ fetchWeather, setUnit }) => {
  const [city, setCity] = useState("");

  const handleSearch = useCallback(() => {
    setUnit("metric");
    fetchWeather(city, "metric");
    localStorage.setItem("lastCity", city);
  }, [fetchWeather, setUnit, city]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
