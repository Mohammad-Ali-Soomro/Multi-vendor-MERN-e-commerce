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
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer hover:bg-[#f3f3f3] py-2"
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              alt={i.title}
              className="w-[25px] h-[25px] object-cover ml-[10px] select-none"
            />
            <h3 className="m-3 text-[14px] leading-[1.3] font-sans font-[500] select-none text-[#333]">
              {i.title}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
