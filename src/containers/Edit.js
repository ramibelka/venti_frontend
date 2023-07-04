import axiosInstance from "../components/axiosInstance";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./Publish.css";

const Edit = ({ userToken }) => {
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [availability, setAvailability] = useState("");
  const [size, setSize] = useState("");
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { articleId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/articles/${articleId}`);
        // const response = await axios.get(
        //   `http://127.0.0.1:8000/api/articles/${articleId}`
        // );
        setData(response.data);
        setTitle(response.data.nom_article);
        setPrice(response.data.prix);
        setDescription(response.data.description);
        setCategory(response.data.categorie);
        setCondition(response.data.Etat);
        setAvailability(response.data.disponibilite);
        setSize(response.data.taille);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [articleId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("nom_article", title);
      formData.append("prix", price);
      formData.append("description", description);
      formData.append("categorie", category);
      formData.append("disponibilite", availability);
      formData.append("Etat", condition);
      if (picture) {
        formData.append("photo", picture);
      }
      formData.append("taille", size);

      axios.defaults.withCredentials = true;
      const response = await axiosInstance.patch(
        `/api/articles/${articleId}/modifier/`,
        formData,
        {
          headers: {
            Authorization: "Token " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const response = await axios.patch(
      //   `http://127.0.0.1:8000/api/articles/${articleId}/modifier/`,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: "Token " + userToken,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      setData(response.data);
      setSuccessMsg("Article updated successfully");
      setErrorMessage("");
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Please enter valid information");
      setIsLoading(false);
    }
  };

  return (
    <div className="form-publish">
      <div className="wrapper">
        <span className="success-msg">{successMsg}</span>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="file" className="upload-file">
              <FontAwesomeIcon icon="plus" className="icon-plus" />
              Ajouter photos
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="ex : Chemise Sézane verte"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              placeholder="00.00 DZD"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="description">Describe your item</label>
            <textarea
              id="description"
              placeholder="i.e., worn a few times, size correctly"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option value="none" disabled hidden>
                Select an Option
              </option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Sport">Sport</option>
            </select>
          </div>

          <div>
            <label htmlFor="condition">Condition</label>
            <input
              type="text"
              id="condition"
              placeholder="i.e, Good condition"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="availability">Availability</label>
            <input
              type="text"
              id="availability"
              placeholder="i.e, Available"
              value={availability}
              onChange={(event) => {
                setAvailability(event.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="size">Size</label>
            <input
              type="text"
              id="size"
              placeholder="i.e, Large"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>

          <input
            type="submit"
            value={isLoading ? "Loading..." : "Update"}
            className="submit btn-green"
            disabled={isLoading}
          />
          <span className="error-msg">{errorMessage}</span>
        </form>
      </div>
    </div>
  );
};

export default Edit;
