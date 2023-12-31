import axiosInstance from "../components/axiosInstance";
import { useState, useEffect } from "react";
import axios from "axios";
import Offers from "../components/Offers";
import { useParams } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner, faPlus);

const Category = ({ userToken }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { category } = useParams();

  const offersTitle = category;
  const show = true;

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
        `/api/articles/${category}`,
        headers
      );
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/articles/${category}`
      // );

      setData(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" spin />
      </span>

      <span>En cours de chargement...</span>
    </div>
  ) : (
    <div>
      <Offers
        data={data}
        offersTitle={category.toUpperCase()}
        show={show}
        userToken={userToken}
        setData={setData}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Category;
