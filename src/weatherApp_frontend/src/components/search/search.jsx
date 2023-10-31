import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import { weatherApp_backend } from "../../../../declarations/weatherApp_backend";

function flattenArray(arr) {
  return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);
}

// ...

const SearchData = ({ listData }) => {
  const containerStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };

  const listStyle = {
    listStyle: "none",
    padding: "0",
  };

  // Flatten the list data if it contains nested arrays
  const flattenedListData = flattenArray(listData);

  return (
    <div style={containerStyle}>
      <h2>Past Weather Search History</h2>
      <ul style={listStyle}>
        {flattenedListData.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    // Fetch the listData when the component mounts
    async function fetchListData() {
      const listData = await weatherApp_backend.fetchList();
      setListData(listData);
    }

    fetchListData();
  }, []);

  console.log(listData);

  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );

    // Storing the inputValue in Motoko data
    await weatherApp_backend.put(inputValue);

    const userSearch = listData.map(({ name }) => name);
    console.log(userSearch);

    const response_1 = await response.json();
    return {
      options: response_1.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }).concat(userSearch.map(name => ({ value: name, label: name })),
      ),
    };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
      <SearchData listData={listData} />
    </div>
  );
};

export default Search;
