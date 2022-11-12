import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { geoURL, gepApiOptions } from "../ApiData";

export default function Search({ onSearchChange }) {
  let [search, setSearch] = useState(null);

  let handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  let loadOptions = (inputValue) => {
    return fetch(
      `${geoURL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      gepApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude} `,
              label: `${city.name},${city.countryCode}`,
            };
          }),
        };
      })
  };

  return (
    <AsyncPaginate
      placeholder="Find Your City"
      debounceTimeout={600}
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
      styles
    />
  );
}
