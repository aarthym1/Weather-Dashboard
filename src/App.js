import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "9a9f85d20a3b230072b0e994c6733d54";

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        setError("City not found");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌤 Weather Dashboard</h1>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />

        <button onClick={fetchWeather} style={styles.button}>
          Get Weather
        </button>

        {loading && <p>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {weather && (
          <div style={styles.weatherBox}>
            <h2>{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <p style={styles.temp}>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>

            <div style={styles.details}>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #74ebd5, #9face6)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#5c67f2",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  weatherBox: {
    marginTop: "20px",
  },
  temp: {
    fontSize: "32px",
    fontWeight: "bold",
  },
  details: {
    marginTop: "10px",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default App;
