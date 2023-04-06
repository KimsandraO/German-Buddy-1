import React from "react";
import Logo from "../Images/Logo2.png";
import Image from "../Images/bgshape.png";
import { NavLink } from "react-router-dom";

const HeaderContainer = () => {
  return (
    <div className="text-con">
      <div className="left-column">
        <img src={Logo} alt="Logo" className="d-inline-block" />
        <p> We help make your settling in Germany uncomplicated.</p>
        <NavLink className="nav-link" to={"/categories"}>
          <button>FIND OUT MORE</button>
        </NavLink>
      </div>
      <div className="image-container">
        <img
          className="right-image"
          src="https://media-public.canva.com/YbKEU/MAE-U0YbKEU/1/tl.png"
          col-md-6
          float-md-end
          mb-3
          ms-md-3
          alt=".."
        />
      </div>
    </div>
  );
};

export default HeaderContainer;
