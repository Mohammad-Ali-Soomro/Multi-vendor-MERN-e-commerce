import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className="relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/arafat-mart/assets/img/bg/header-res-bg.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize">
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba] leading-relaxed">
          Explore our wide range of premium products tailored directly to your home.
          Discover artisanal furniture, high-fidelity audio equipment, and minimal
          decor collections that bring your workspace and home to life.
        </p>
        <Link to="/products" className="inline-block mt-8">
          <div className={`${styles.button} !bg-blue-600 !rounded-md hover:!bg-blue-700 transition`}>
            <span className="text-[#fff] font-[Poppins] text-[18px] font-[500]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
