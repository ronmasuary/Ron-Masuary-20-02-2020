import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentTemp } from "../services/weather";

export default function Favorites({ favorites, pickCity }) {
  const [currentTemps, setCurrentTemps] = useState([]);
  const [error, setError] = useState(false);

  const getCurrentTemps = async () => {
    const temps = [];
    for (let city of favorites) {
      const currentTemp = await getCurrentTemp(city.key);
      if (!currentTemp) {
        setError(true);
        continue;
      }
      const temperature =
        currentTemp.Temperature.Metric.Value +
        "°" +
        currentTemp.Temperature.Metric.Unit;
      temps.push({ ...city, temperature, details: currentTemp.WeatherText });
    }
    setCurrentTemps(temps);
  };

  useEffect(() => {
    getCurrentTemps();
  }, []);

  return (
    <div>
      {error &&
        "Could not load weather data, please refresh and try again later"}
      <ul className="list-group list-group-horizontal-md col-md col-3 ml-3 d-flex justify-content-center mt-5">
        {currentTemps.map(fav => {
          return (
            <Link to="/" className="regular-text">
              <div>
                <div
                  className="card bg-success ml-3 "
                  style={{ width: "190px" }}
                  onClick={() => pickCity(fav.key, fav.city)}
                >
                  <h5 className="card-header">{fav.city}</h5>
                  <div className="card-body ">
                    <h4 className="card-title"> {fav.temperature}</h4>
                    <h5 className="card-text">{fav.details} </h5>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
