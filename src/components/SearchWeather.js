import React, { useState } from "react";
import "./SearchWeather.css";
import "./DisplayWeather.css";

function SearchWeather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: ""
  });

  const APIKEY = "f7c18dead047c5835f2901a89d6af971";

  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Add city name");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log('Error encountered!',err));

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({form, city: value });
    }
  };

  return (
      
    <div className={(typeof weather.data !== "undefined" && weather.data.cod!=="404") ? ((weather.data.main.temp - 273.15 > 18) ? 'bg warm' : 'bg cool') : 'bg'}>
    
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City name"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Search
        </button>
      </form>

       {console.log(weather.data)} 
      {weather.data !== undefined ? (
        <div className="displayweather">
      {weather.data.cod !== "404" ? (
        <React.Fragment>
          <div className="maincard">
            <span className="cardtitle">
              {weather.data.name} , {weather.data.sys.country}. 
            </span>
            <span className="cardsubtitle">
                Weather As of {new Date().toLocaleTimeString()}
            </span>

            <h1>
              {" "}
              {Math.floor(weather.data.main.temp - 273.15)}
              <sup><sup>o</sup>C</sup> &nbsp;
            </h1>
            <span className="weather-main">{weather.data.weather[0].main}</span>
            <img className="weather-icon" src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`} alt="Weather icon" />
            <span className="weather-description">
              {" "}
            </span>
          </div>
          <div className="weatherdetails">
            <div className="section1">
              <table>
                  <tbody>
                    <tr>
                    <td>
                        <h4>Temperature Felt</h4>
                    </td>
                    <td>
                        <span>
                        {Math.floor(weather.data.main.feels_like - 273.15)} 
                        <sup><sup>o</sup>C</sup>
                        </span>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <h4>Air Pressure</h4>
                    </td>
                    <td>
                        <span>{weather.data.main.pressure} hPa</span>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <h4>Humidity</h4>
                    </td>
                    <td>
                        <span>{weather.data.main.humidity} %</span>
                    </td>
                    </tr>
                    <tr>
                    <td>
                        <h4>Visibility</h4>
                    </td>
                    <td>
                        <span>{weather.data.visibility / 1000} Km</span>
                    </td>
                    </tr>
                </tbody>
              </table>
            </div>

            <div className="section2">
              <table>
                  <tbody>
                  <tr>
                <td>
                    <h4>High/Low</h4>
                  </td>
                  <td>
                    <span>
                      {Math.floor(weather.data.main.temp_max - 273.15)}/
                      {Math.floor(weather.data.main.temp_min - 273.15)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Wind speed</h4>
                  </td>
                  <td>
                    <span>{Math.floor((weather.data.wind.speed * 18) / 5)} km/hr</span>
                  </td>
                </tr>
                
                <tr>
                  <td>
                    <h4>Sunrise</h4>
                  </td>
                  <td>
                    <span>
                      {new Date(weather.data.sys.sunrise * 1000).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Sunset</h4>
                  </td>
                  <td>
                    <span>
                      {new Date(weather.data.sys.sunset * 1000).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="maincard">
          <h2>{weather.data.message}</h2>
        </div>
      )}
    </div>
      ) : null}
    </div>
    </div>

  );
}

export default SearchWeather;
