import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import CommentSection from "../components/CommentSection";
import { Link } from "react-router-dom";

const Offer = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/articles/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/articles/${id}/supprimer/`,
        {
          headers: {
            Authorization: "Token " + userToken,
          },
        }
      );
      history.push("/");
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
              <Link to={`/profiles/${data.auteur_id}`}>
                <div>
                  {data.photo ? <img src={data.photo} alt="/" /> : null}
                  <span>{data.auteur}</span>{" "}
                  <button
                    className="btn-white"
                    onClick={() => {
                      history.push("/Messages");
                    }}
                  >
                    Send message
                  </button>
                </div>
              </Link>
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
      </main>
    </>
  );
};

export default Offer;
