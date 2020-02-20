

const apiKey = "bAi958lyF2zSL1IevwWt6JHXKumB0AMl";
const apiHost = "https://dataservice.accuweather.com";

export async function getAutoComplete(searchQuery) {
    const response = await fetch(
      `${apiHost}/locations/v1/cities/autocomplete?q=${searchQuery}&apikey=${apiKey}`
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    }

    alert("Could not load data from AccuWeather");
    return [];
  }

  export async function get5DaysForecast(key) {
    const response = await fetch(
      `${apiHost}/forecasts/v1/daily/5day/${key}?metric=true&apikey=${apiKey}`
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    }

    alert("Could not load data from AccuWeather");
    return null;
  }

  export async function getCurrentTemp(key) {
    const response = await fetch(
      `${apiHost}/currentconditions/v1/${key}?apikey=${apiKey}`
    );
    if (response.ok) {
      const json = await response.json();
      return json[0];
    }

    alert("Could not load data from AccuWeather");
    return null;
  }

  
