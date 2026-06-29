import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div className="my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md gap-4">
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className={`${styles.section} bg-white p-6 rounded-lg shadow-sm mb-12`}>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-[20px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (category) => {
                navigate(`/products?category=${category.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden p-3 hover:bg-gray-50 rounded transition"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className="text-[18px] font-[500] leading-[1.3] text-[#333] pr-2">
                    {i.title}
                  </h5>
                  <img
                    src={i.image_Url}
                    alt={i.title}
                    className="w-[120px] object-cover h-full rounded"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
