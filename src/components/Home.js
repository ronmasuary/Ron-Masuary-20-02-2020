import React, { useEffect } from "react";
import SearchBar from "./SearchBar";

export default function Home({
  pickCity,
  currentDate,
  currentTemp,
  fiveDays,
  cityKey,
  favorites,
  toggleFavorites
}) {
  useEffect(() => {
    pickCity(currentTemp.key, currentTemp.cityName);
  }, []);

  let addOrRem = "add to favorites";
  if (favorites.find(fav => fav.city === currentTemp.cityName)) {
    addOrRem = "remove from favorites";
  }


  return (
    <div>
      <div className="pt-4 d-flex justify-content-center">
        <SearchBar pickCity={pickCity} />
      </div>
      <p></p>
      <div className="border border-info p-1 rounded">
        <div>
          <h3>
            <img alt={currentTemp.details} src={currentTemp.icon} /> {currentTemp.cityName}
            <button
              onClick={() => {
                toggleFavorites(currentTemp);
              }}
              className="btn btn-success add-to-favorites"
            >
              {addOrRem}
            </button>
          </h3>{" "}
        </div>
        <div>
          <h6> {currentTemp.temperature}</h6>
          <br />
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <h1>{currentTemp.details}</h1>
        </div>

        <div className="row d-flex justify-content-center mt-5 weather-home-dates">
          <ul
            className="list-group list-group-horizontal-md col-md col-3 ml-3 d-flex justify-content-center "
            style={{ textAlign: "center" }}
          >
            {[
              fiveDays.map(e => {
                return (
                  <div key={e.date.toString()}>
                    <div className="card bg-primary mt-4 ml-3">
                      <h5 className="card-header">{e.date.toString()}</h5>
                      <div className="card-body ">
                        <h4 className="card-title">{e.weather}°</h4>
                      </div>
                    </div>
                  </div>
                );
              })
            ]}
          </ul>
        </div>
      </div>
    </div>
  );
}
