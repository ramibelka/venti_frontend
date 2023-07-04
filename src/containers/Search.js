import axiosInstance from "../components/axiosInstance";
import { useState, useEffect } from "react";
import Offers from "../components/Offers";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
library.add(faSpinner, faPlus);

const Search = ({ userToken }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const offersTitle = "Results";
  const show = true;

  const location = useLocation();
  const searchResults = location.state.searchResults;
  const searchInput = location.state.searchInput;

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  //const [size, setSize] = useState("");

  useEffect(() => {
    setData(searchResults);
    setIsLoading(false);
  }, []);

  let headers = {};
  if (userToken) {
    headers = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/api/articles/search-filter/?search=${searchInput}`,
        headers
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axiosInstance.get(`/api/articles/search-filter/`, {
        params: {
          search: searchInput,
          min_prix: minPrice,
          max_prix: maxPrice,
          //taille: size,
        },
      });

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" spin />
      </span>
      <span>Loading...</span>
    </div>
  ) : (
    <div>
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <div className="filter-input">
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="filter-input">
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button type="submit">Apply Filters</button>
      </form>

      <Offers
        data={data}
        offersTitle={offersTitle}
        show={show}
        userToken={userToken}
        setData={setData}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Search;
