import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import { get5DaysForecast, getCurrentTemp } from "./services/weather";

function App() {
  let currentDate = new Date();
  const [fiveDays, setFiveDays] = useState([]);
  const [currentTemp, setCurrentTemp] = useState({
    key: 215854,
    cityName: "Tel Aviv",
    details: "",
    temperature: ""
  });
  const [error, setError] = useState(false);

  const pickCity = async (key, cityName) => {
    const current = await getCurrentTemp(key);
    if (!current) {
      setError(true);
    }
    setCurrentTemp({
      key,
      cityName,
      details: current.WeatherText,
      icon: `https://developer.accuweather.com/sites/default/files/${String(
        current.WeatherIcon
      ).padStart(2, "0")}-s.png`,
      temperature:
        current.Temperature.Metric.Value + "°" + current.Temperature.Metric.Unit
    });

    const result = await get5DaysForecast(key);
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: "UTC"
    });
    const fiveDaysData = result.DailyForecasts.map(day => {
      const weather = Math.floor(
        (day.Temperature.Minimum.Value + day.Temperature.Maximum.Value) / 2
      );

      const dayName = formatter.format(new Date(day.EpochDate * 1000));
      return { weather, date: dayName };
    });
    setFiveDays(fiveDaysData);
  };

  const [favorites, setFavorites] = useState([]);

  const toggleFavorites = ({ cityName, key }) => {
    let favIndex = favorites.findIndex(
      fav => fav.city === currentTemp.cityName
    );
    if (favIndex !== -1) {
      let temp = [...favorites];
      temp.splice(favIndex, 1);
      setFavorites([...temp]);
      return;
    }
    setFavorites([...favorites, { city: cityName, key: key }]);
  };

  return (
    <div className="container-md fluid ">
      {error &&
        "Could not load weather data, please refresh and try again later"}
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <div className="justify-center">
              <Home
                fiveDays={fiveDays}
                currentTemp={currentTemp}
                currentDate={currentDate}
                pickCity={pickCity}
                setFavorites={setFavorites}
                favorites={favorites}
                toggleFavorites={toggleFavorites}
              />
            </div>
          </Route>
          <Route exact path="/favorites">
            <Favorites favorites={favorites} pickCity={pickCity} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
