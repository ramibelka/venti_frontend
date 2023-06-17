import { Link } from "react-router-dom";
import hero1 from "../assets/img/hero-banner-1.jpg";
import whiteCut from "../assets/img/banner-cut.svg";
//import "./Hero.css"; 

const Hero = () => {

  return (
    <div className="hero">
      <img src={hero1} alt="Banner" className="banner" />
      <div>
        <h1>WELCOME TO THIS WORLD</h1>
        <Link to="/publish">Start selling</Link>
      </div>
      <img src={whiteCut} alt="End banner" className="banner-cut" />
    </div>
  );
};

export default Hero;
