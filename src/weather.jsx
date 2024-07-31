import React, { useState, useEffect } from 'react';
import './weather.css';
import clearcool from './clearcool.gif';
import clearhot from './clearhot.gif';
import toocool from './toocool.gif';
import rainy from './rainy.gif';
import snowy from './snowy.gif';
import cloudy from './cloudy.gif';
import thunderstorm from './thunderstorm.gif';
import drizzle from './drizzle.gif';
import mist from './mist.gif';
import haze from './haze.gif';
import foggy from './foggy.gif';

const openWeatherMapApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;;
const openAiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [manualInput, setManualInput] = useState(true);
  const [sentiment, setSentiment] = useState("");

  useEffect(() => {
    if (!manualInput && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}`);
            if (!response.ok) {
              throw new Error('Error fetching weather data.');
            }
            const data = await response.json();
            setLocation(data.name);
            setWeatherData(data);
            setError(null);
          } catch (error) {
            setError(error.message);
            setWeatherData(null);
          }
        },
        (error) => {
          setError('Error getting location.');
        }
      );
    }
  }, [manualInput]);

  async function callOpenAIAPI(loc,weather, temp, humidity, wind, pressure) {
    setSentiment("");
    setError("");
    console.log("Calling API");

    const APIBody = {
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: " Give short suggestions for plant care according to weather conditions and location in 2 to 3 bullet structure.Keep it short." },
        { role: "user", content: `Location:${loc},Weather: ${weather}, Temperature: ${(temp - 273.15).toFixed(2)}°C, Humidity: ${humidity}%, Wind Speed: ${wind} m/s, Pressure: ${pressure} hPa` }
      ],
      temperature: 0.7,
      max_tokens: 128,
    };

    try {
      const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openAiApiKey}`
        },
        body: JSON.stringify(APIBody)
      });

      if (!response.ok) {
        throw new Error(`Sorry unable to provide information now!`);
      }

      const data = await response.json();
      console.log(data);

      if (data.choices && data.choices.length > 0) {
        setSentiment(data.choices[0].message.content);
      } else {
        setSentiment("No suggestions available.");
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setError(error.message);
    }
  }

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setManualInput(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openWeatherMapApiKey}`);
      if (!response.ok) {
        throw new Error('Error fetching weather data. Please check the location.');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const handleCurrentLocationClick = () => {
    setManualInput(false);
  };

  const getBackgroundStyle = () => {
    if (!weatherData) return {};
    console.log(weatherData);
    const weather = weatherData.weather[0].main;
    const temperatureCelsius = weatherData.main.temp - 273.15;

    if (weather === 'Clear' && temperatureCelsius >= 15 && temperatureCelsius <= 30) {
      return {
        backgroundImage: `url(${clearcool})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Clear' && temperatureCelsius >= 31 && temperatureCelsius <= 40) {
      return {
        backgroundImage: `url(${clearhot})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Clear' && temperatureCelsius <= 14) {
      return {
        backgroundImage: `url(${toocool})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Rain') {
      return {
        backgroundImage: `url(${rainy})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Snow') {
      return {
        backgroundImage: `url(${snowy})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Clouds') {
      return {
        backgroundImage: `url(${cloudy})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Thunderstorm') {
      return {
        backgroundImage: `url(${thunderstorm})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Drizzle') {
      return {
        backgroundImage: `url(${drizzle})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Mist') {
      return {
        backgroundImage: `url(${mist})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Haze') {
      return {
        backgroundImage: `url(${haze})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    if (weather === 'Fog') {
      return {
        backgroundImage: `url(${foggy})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }

    return {};
  };

  useEffect(() => {
    if (weatherData) {
      callOpenAIAPI(weatherData.name,weatherData.weather[0].main, weatherData.main.temp, weatherData.main.humidity, weatherData.wind.speed, weatherData.main.pressure);
    }
  }, [weatherData]);

  return (
    <div style={{ textAlign: 'center', height: '1000px', fontFamily: 'Arial, sans-serif', ...getBackgroundStyle() }}>
      <h1 className='title1'>Monsterra 🌿</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleChange}
          style={{ padding: '10px' }}
        />
        <button type="submit">Get Weather</button>
      </form>
      <button onClick={handleCurrentLocationClick}>Get Current Location</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData && (
        <div className="mainbox" style={{ marginTop: '20px' }}>
          <div className='details'>
            <ul>
              <li>{weatherData.main.humidity}% <br />💧Humidity</li>
              <li>{weatherData.wind.speed} m/s <br />🎏 Wind Speed</li>
              <li>{weatherData.main.pressure} hPa <br />🔩 Pressure</li>
            </ul>
          </div>
          <div className="plantinfo">
            {sentiment && <p>{sentiment}</p>}
          </div>
          <div className="sidebox">
            <h2>📌{weatherData.name}</h2>
            <div className="cond">
              <p className='temper'>{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
              <p>{weatherData.weather[0].main} <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="" /></p>
            </div>
            <p className="desc">{weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
