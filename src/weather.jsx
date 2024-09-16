import React, { useState, useEffect } from 'react';
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

const openWeatherMapApiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
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

  async function callOpenAIAPI(loc, weather, temp, humidity, wind, pressure) {
    setSentiment("");
    setError("");

    const APIBody = {
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: "Give short suggestions for plant care according to weather conditions and location in 2 to 3 bullet structure. Keep it short." },
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
        throw new Error(`Sorry, unable to provide information now!`);
      }

      const data = await response.json();

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
    const weather = weatherData.weather[0].main;
    const temperatureCelsius = weatherData.main.temp - 273.15;

    if (weather === 'Clear' && temperatureCelsius >= 15 && temperatureCelsius <= 30) {
      return { backgroundImage: `url(${clearcool})` };
    }
    if (weather === 'Clear' && temperatureCelsius >= 31 && temperatureCelsius <= 40) {
      return { backgroundImage: `url(${clearhot})` };
    }
    if (weather === 'Clear' && temperatureCelsius <= 14) {
      return { backgroundImage: `url(${toocool})` };
    }
    if (weather === 'Rain') {
      return { backgroundImage: `url(${rainy})` };
    }
    if (weather === 'Snow') {
      return { backgroundImage: `url(${snowy})` };
    }
    if (weather === 'Clouds') {
      return { backgroundImage: `url(${cloudy})` };
    }
    if (weather === 'Thunderstorm') {
      return { backgroundImage: `url(${thunderstorm})` };
    }
    if (weather === 'Drizzle') {
      return { backgroundImage: `url(${drizzle})` };
    }
    if (weather === 'Mist') {
      return { backgroundImage: `url(${mist})` };
    }
    if (weather === 'Haze') {
      return { backgroundImage: `url(${haze})` };
    }
    if (weather === 'Fog') {
      return { backgroundImage: `url(${foggy})` };
    }

    return {};
  };

  useEffect(() => {
    if (weatherData) {
      callOpenAIAPI(weatherData.name, weatherData.weather[0].main, weatherData.main.temp, weatherData.main.humidity, weatherData.wind.speed, weatherData.main.pressure);
    }
  }, [weatherData]);

  return (
    <div className="min-h-screen text-center p-8 flex flex-col items-center justify-center bg-cover bg-center" style={{ fontFamily: 'Poppins, sans-serif', ...getBackgroundStyle() }}>
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-blue-500 mb-8 animate-pulse">Monsterra 🌿</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-center md:flex-row md:items-start">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleChange}
          className="p-4 rounded-lg shadow-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 w-80 transition-all duration-500 ease-in-out transform hover:scale-105"
        />
        <button type="submit" className="ml-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gradient-to-bl hover:from-blue-1000 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
          Get Weather
        </button>
      </form>
      <button onClick={handleCurrentLocationClick} className="mb-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 transition-all duration-300">
        Get Current Location
      </button>
      {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-white">
          <div className="p-6 bg-gray-800 bg-opacity-40 rounded-xl shadow-lg backdrop-blur-lg border border-gray-600 border-opacity-40 transition-all duration-500 ease-in-out transform hover:scale-105">
            <ul className="space-y-4">
              <li className="text-xl md:text-2xl">{weatherData.main.humidity}% <br />💧 Humidity</li>
              <li className="text-xl md:text-2xl">{weatherData.wind.speed} m/s <br />🎏 Wind Speed</li>
              <li className="text-xl md:text-2xl">{weatherData.main.pressure} hPa <br />🔩 Pressure</li>
            </ul>
          </div>
          <div className="plantinfo p-8 bg-gray-800 bg-opacity-50 rounded-2xl shadow-lg backdrop-blur-lg border border-gray-700 border-opacity-60 transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-300">
                {weatherData.name}🌡️
                <span className="block text-xl md:text-2xl mt-2">
                  {(weatherData.main.temp - 273.15).toFixed(2)}°C
                </span>
              </h2>
              <p className="text-lg md:text-xl font-medium mb-4 text-gray-400">
                {weatherData.weather[0].main}
              </p>
              <img
                src={weatherData.weather[0].icon.includes('d') ? `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` : `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
                className="w-24 h-24"
              />
            </div>
          
          </div>
          <p className="p-8 bg-gray-800 bg-opacity-50 rounded-2xl shadow-lg backdrop-blur-lg border border-gray-700 border-opacity-60 transition-transform transform hover:scale-105 text-md md:text-lg ">{sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
