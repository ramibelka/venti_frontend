import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
//import "./Offer.css";

const Offer = ({ userToken, setUser }) => {
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
                <p>Description</p>
                <p>Disponibilite</p>
                <p>Etat</p>
              </div>
              <div>
                <div>
                  <p>{data.description}</p>
                </div>

                {/* {data.map((elem, index) => {
                  return elem.description ? (
                    <div key={index}>
                      <p>{elem.description}</p>
                    </div>
                  ) : null;
                })} */}
                <div>
                  <p>{data.Etat}</p>
                </div>
              </div>
            </div>

            <div className="bloc-2">
              <p>{data.nom_article}</p>
              <p>{data.description}</p>
              <div>
                {data.photo ? <img src={data.photo} alt="/" /> : null}
                <span>{data.auteur}</span>
              </div>
            </div>
            <button
              className="btn-green"
              onClick={() => {
                history.push("/Messages");
              }}
            >
              Send message
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Offer;
