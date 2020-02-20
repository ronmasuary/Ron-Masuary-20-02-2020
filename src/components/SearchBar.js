import React, { useState } from "react";
import { getAutoComplete } from "../services/weather";

export default function SearchBar({ pickCity, apiKey, apiHost }) {
  const [query, setQuery] = useState("Tel Aviv");
  const [suggestions, setSuggestions] = useState([]);

  const search = async searchQuery => {
    const finalSearchQuery = searchQuery.replace(/[^a-zA-Z ]/g, "");
    if (finalSearchQuery === query) {
      return;
    }
    setQuery(finalSearchQuery);
    if (!finalSearchQuery) {
      return;
    }
    const result = await getAutoComplete(finalSearchQuery);
    if (result.length === 1) {
      setSuggestions([]);
      pickCity(result[0].Key, result[0].LocalizedName);
    } else {
      setSuggestions(
        result.map(result => {
          return { key: result.Key, name: result.LocalizedName };
        })
      );
    }
  };

  const handleSearch = event => {
    search(event.target.value);
  };

  let suggestionElements;
  if (suggestions.length) {
    suggestionElements = <div className="border border-dark rounded">{suggestions.map(suggestion => (
      <div key={suggestion.key}>
        <a href="#"
          onClick={e => {
            e.preventDefault();
            setSuggestions([]);
            pickCity(suggestion.key, suggestion.name);
          }}
        >
          {suggestion.name}
        </a>
      </div>
        ))}</div>;
  }
  return (
    <div>
      <div>
        <input placeholder="search.." value={query} onChange={handleSearch} />
        {suggestionElements}
      </div>
    </div>
  );
}
