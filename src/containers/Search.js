import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Offers from "../components/Offers";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
library.add(faSpinner, faPlus);

const Search = (userToken = { userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const offersTitle = "Results";
  const show = true;

  const location = useLocation();
  const searchResults = location.state.searchResults;

  // My Api : https://vinted--le-reacteur.herokuapp.com/offers
  // Le Reacteur API : https://lereacteur-vinted-api.herokuapp.com/offers

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" spin />
      </span>

      <span>Loading...</span>
    </div>
  ) : (
    <div>
      <Offers
        data={searchResults}
        offersTitle={offersTitle}
        show={show}
        userToken={userToken}
      />
    </div>
  );
};
export default Search;
