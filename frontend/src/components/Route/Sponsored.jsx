import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div className={`${styles.section} bg-white py-10 px-5 mb-12 rounded-lg shadow-sm hidden sm:block`}>
      <div className="flex justify-between items-center w-full gap-4">
        <div className="flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg"
            alt="Sony"
            className="w-[120px] object-contain opacity-50 hover:opacity-100 transition duration-200"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg"
            alt="Dell"
            className="w-[120px] object-contain opacity-50 hover:opacity-100 transition duration-200"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg"
            alt="LG"
            className="w-[70px] object-contain opacity-50 hover:opacity-100 transition duration-200"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple"
            className="w-[50px] object-contain opacity-50 hover:opacity-100 transition duration-200"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
            alt="Samsung"
            className="w-[120px] object-contain opacity-50 hover:opacity-100 transition duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
