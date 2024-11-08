import React from "react";

const Favorites = ({ favorites, fetchWeather, removeFavorite }) => {
  return (
    <div className="favorites">
      <h3>Your Favorite Cities</h3>
      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((city) => (
            <li key={city.id} className="favorite-item">
              <span
                className="favorite-city"
                onClick={() => fetchWeather(city.name)}
              >
                {city.name}
              </span>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(city)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-favorites">No favorite cities added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
