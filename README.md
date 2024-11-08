# Weather Dashboard 🌤️

A responsive and interactive weather dashboard built using React, which fetches real-time weather data from the OpenWeatherMap API. Users can search for a city, view current weather, check a 5-day forecast, and save favorite cities for quick access.

## Features ✨

- **City Search**: Search for any city to view current weather conditions.
- **Weather Display**: Shows temperature, weather conditions, and a 5-day forecast.
- **Unit Toggle**: Switch between Celsius and Fahrenheit units.
- **Favorites Management**: Add cities to a favorites list for easy access, with options to add and remove cities.
- **Error Handling**: Provides feedback for invalid city names and API errors.

## Technologies Used 🛠️

- **React**: Frontend framework used to create interactive UI.
- **Axios**: To handle HTTP requests for fetching data from OpenWeatherMap API.
- **OpenWeatherMap API**: Source of real-time weather data.
- **JSON Server**: Local JSON server used to manage the favorites list.

## Installation and Setup 🚀

1. **Clone the repository:**

   ```bash
   https://github.com/vishalkamdi/weather-dashboard.git
   ```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up the JSON Server:**

Start JSON Server to simulate a local API for managing favorite cities.

```
npx json-server --watch db.json --port 5000
```

4. **Configure the API Key:**
   Sign up at OpenWeatherMap for an API key and update WeatherDashboard.js with your API key:

```
const apiKey = "your_api_key";
```

5. **Start the Application:**

```
npm start
```

This will start the app on http://localhost:3000.
