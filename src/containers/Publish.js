import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import "./Publish.css";

const Publish = ({ userToken }) => {
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [availability, setAvailability] = useState("");
  const [size, setSize] = useState("");
  const [picture, setPicture] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      formData.append("photo", picture);
      formData.append("taille", size);

      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://127.0.0.1:8000/api/articles/ajouter/",
        formData,
        {
          headers: {
            Authorization: "Token " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Please enter a valid information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-publish">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="file" className="upload-file">
              <FontAwesomeIcon icon="plus" className="icon-plus" />
              Ajouter photos
            </label>
            <input
              type="file"
              id="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
              //required
            />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="ex : Chemise Sézane verte"
              required
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
              required
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
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
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
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="Disponibilite">Availability</label>
            <input
              type="text"
              id="availability"
              placeholder="i.e, Available"
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
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>

          <input
            type="submit"
            value={isLoading ? "Loading..." : "Ajouter"}
            className={"submit btn-green"}
            disabled={isLoading}
          />
          <span>{errorMessage}</span>
        </form>
      </div>
    </div>
  );
};

export default Publish;
