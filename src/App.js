import axios from "axios";
import React, { useState } from "react";

function App() {
  const [place, setPlace] = useState("");
  const [data, setData] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metrics&appid=9bb800ed9ad4bcf183a96dd32670a382`;
  const searchLocation = () => {
    axios
      .get(url)
      .then((result) => {
        setData(result.data);
        //console.log(result.data); -- for checking....
      })
      .catch((err) => {
        console.log(err);
      });
    setPlace("");
  };
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder="Enter The Location...."
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        ></input>
        <button className="submit" onClick={searchLocation}>
          submit
        </button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data && data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1> {(data.main.temp / 10).toFixed()}°C</h1>}
            {data.main && (
              <p>Max temp: {(data.main.temp_max / 10).toPrecision(5)}°C</p>
            )}
            {data.main && (
              <p>Min temp: {(data.main.temp_min / 10).toPrecision(5)}°C</p>
            )}
          </div>
          <div className="description">
            {data.weather && data.weather[0].description}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main && (
                <p className="bold">
                  {(data.main.feels_like / 10).toFixed()}°C
                </p>
              )}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className="winds">
              {data.wind && <p className="bold">{data.wind.speed}MPH</p>}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
