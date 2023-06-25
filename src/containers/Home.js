import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Offers from "../components/Offers";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner, faPlus);

const Home = (userToken = { userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const offersTitle = "Popular items";
  const show = true;

  // My Api : https://vinted--le-reacteur.herokuapp.com/offers
  // Le Reacteur API : https://lereacteur-vinted-api.herokuapp.com/offers
  if (userToken) {
    const headers = {
      headers: {
        Authorization: "Token " + userToken,
        "Content-Type": "multipart/form-data",
      },
    };
  } else {
    const headers = "";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"https://lereacteur-vinted-api.herokuapp.com/offers"
          "http://127.0.0.1:8000/api/articles/"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" spin />
      </span>

      <span>Loading...</span>
    </div>
  ) : (
    <div>
      <Hero />
      <Offers
        data={data}
        offersTitle={offersTitle}
        show={show}
        userToken={userToken}
      />
    </div>
  );
};
export default Home;
