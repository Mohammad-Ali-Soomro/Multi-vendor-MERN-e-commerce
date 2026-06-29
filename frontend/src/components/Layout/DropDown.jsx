import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="absolute top-full mt-2 left-0 w-[280px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 z-50 overflow-hidden">
      {categoriesData && categoriesData.map((i, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cream cursor-pointer transition-colors group"
          onClick={() => submitHandle(i)}
        >
          <img
            src={i.image_Url}
            className="w-8 h-8 object-contain rounded-lg"
            alt=""
          />
          <span className="font-sans text-sm font-medium text-dark group-hover:text-forest transition-colors">
            {i.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
