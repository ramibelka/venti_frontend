import axiosInstance from "../components/axiosInstance";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import Offers from "../components/Offers";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner, faPlus);

const Home = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const offersTitle = "Popular items";
  const show = true;

  const token = localStorage.getItem("authToken");

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
      const response = await axiosInstance.get("/api/articles", headers);
      setData(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]);

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
        setData={setData}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Home;
