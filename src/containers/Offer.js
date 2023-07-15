import axiosInstance from "../components/axiosInstance";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import CommentSection from "../components/CommentSection";
import { Link } from "react-router-dom";
import profileImage from "../assets/img/default-profile-pic.jpg";
import Offers from "../components/Offers";

const Offer = ({ userToken }) => {
  const [data, setData] = useState();
  const [recommendedData, setRecommendedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { id } = useParams();

  let headers = {};
  if (userToken) {
    headers = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
  }

  const fetchRecommendedData = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/api/item/articles/${id}/item-similarity/`,
        headers
      );
      return response.data; // Return the response data
    } catch (e) {
      console.log(e.message);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/api/articles/${id}`);
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/articles/${id}`
      // );
      setData(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const fetchAndSetRecommendedData = async () => {
      const recommendedData = await fetchRecommendedData(id);
      if (recommendedData) {
        setRecommendedData(recommendedData);
      }
    };

    fetchData();
    fetchAndSetRecommendedData(id); // Fetch and set recommended data
  }, [id]);

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/articles/${id}/supprimer/`, {
        headers: {
          Authorization: "Token " + userToken,
        },
      });
      // await axios.delete(
      //   `http://127.0.0.1:8000/api/articles/${id}/supprimer/`,
      //   {
      //     headers: {
      //       Authorization: "Token " + userToken,
      //     },
      //   }
      // );
      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <main className="main-offer">
        <div className="wrapper offer-page">
          <div className="carousel">
            <img src={data.photo} alt="/" />
          </div>
          <div className="offer-page-details">
            <p className="offer-price">{data.prix} DZD</p>
            <div className="bloc-1">
              <div>
                <p>Availability</p>
                <p>Condition</p>
                <p>Size</p>
                <p>Category</p>
              </div>
              <div>
                <div>
                  <p>{data.disponibilite}</p>
                </div>
                <div>
                  <p>{data.Etat}</p>
                </div>
                <div>
                  <p>{data.taille}</p>
                </div>
                <div>
                  <p>{data.categorie}</p>
                </div>
              </div>
            </div>

            <div className="bloc-2">
              <p>{data.nom_article}</p>
              <p>{data.description}</p>
              <div>
                <Link to={`/profiles/${data.auteur_id}`}>
                  <div>
                    <img
                      src={
                        data.photo_de_profile
                          ? data.photo_de_profile
                          : profileImage
                      }
                      alt="/"
                    />
                    <span>{data.auteur}</span>{" "}
                  </div>
                </Link>
                <button
                  className="btn-white"
                  onClick={() => {
                    history.push("/Messages");
                  }}
                >
                  Send message
                </button>
              </div>
            </div>
            {userToken && (
              <>
                <button className="btn-green" onClick={handleEdit}>
                  Edit
                </button>
                <button className="btn-green" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>

          <CommentSection
            userToken={userToken}
            articleId={id}
            data={data}
            setData={setData}
          />
        </div>
        <Offers
          data={recommendedData}
          offersTitle={"Similar items"}
          show={true}
          userToken={userToken}
          setData={setData}
          fetchData={fetchRecommendedData}
        />
      </main>
    </>
  );
};

export default Offer;
