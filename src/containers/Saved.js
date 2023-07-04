import axiosInstance from "../components/axiosInstance";
import { useState, useEffect } from "react";
import axios from "axios";
import Offers from "../components/Offers";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner, faPlus);

const Saved = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const offersTitle = "Saved items";
  const show = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/favoris/", {
          headers: {
            Authorization: "Token " + userToken,
          },
        });
        // const response = await axios.get("http://127.0.0.1:8000/api/favoris/", {
        //   headers: {
        //     Authorization: "Token " + userToken,
        //   },
        // });
        const modifiedData = response.data.map((item) => item.article);
        setData(modifiedData);
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
      <Offers
        data={data}
        offersTitle={offersTitle}
        show={show}
        userToken={userToken}
      />
    </div>
  );
};
export default Saved;
