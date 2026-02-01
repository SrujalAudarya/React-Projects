import React, { useState } from 'react';

const WeatherApp = () => {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bgClass, setBgClass] = useState('bg-default'); // Default background

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!cityInput) return;

    setLoading(true);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=6f114610b0a37fd54fb571d914e47670&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        updateBackground(data.main.temp);
      } else {
        alert("City not found or API error!");
        setWeatherData(null);
        setBgClass('bg-default');
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logic to change background based on temperature
  const updateBackground = (temp) => {
    if (temp < 15) {
      setBgClass('bg-cold'); // Cold Weather
    } else if (temp > 28) {
      setBgClass('bg-warm'); // Hot Weather
    } else {
      setBgClass('bg-default'); // Moderate Weather
    }
  };

  return (
    // Dynamic Background Wrapper
    <div className={`weather-app-container ${bgClass}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-sm-8">
            
            {/* Glass Card Start */}
            <div className="card glass-card p-4">
              <h2 className="text-center mb-4 font-weight-bold">Weather Cast</h2>
              
              {/* Search Form */}
              <form onSubmit={handleSearch}>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    className="form-control glass-input"
                    placeholder="Enter City Name..."
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                  />
                  <div className="input-group-append ml-2">
                    <button className="btn glass-btn text-white" type="submit">
                      {loading ? '...' : 'Search'}
                    </button>
                  </div>
                </div>
              </form>

              {/* Weather Data Display */}
              {weatherData && (
                <div className="text-center animate-fade-in">
                  <h3 className="mb-0">{weatherData.name}, {weatherData.sys.country}</h3>
                  <p className="small">{new Date().toLocaleDateString()}</p>
                  
                  <div className="my-4">
                    <h1 className="display-1 font-weight-bold">
                      {Math.round(weatherData.main.temp)}°
                    </h1>
                    <p className="lead text-capitalize">
                      {weatherData.weather[0].description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="row mt-4 pt-3 border-top border-light">
                    <div className="col-6 border-right border-light">
                      <p className="mb-0 small">Humidity</p>
                      <h5>{weatherData.main.humidity}%</h5>
                    </div>
                    <div className="col-6">
                      <p className="mb-0 small">Wind Speed</p>
                      <h5>{weatherData.wind.speed} m/s</h5>
                    </div>
                  </div>
                </div>
              )}

              {!weatherData && !loading && (
                <div className="text-center mt-3" style={{ opacity: 0.7 }}>
                  <p>Start by searching for a city.</p>
                </div>
              )}
            </div>
            {/* Glass Card End */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;