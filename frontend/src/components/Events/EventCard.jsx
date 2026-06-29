import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const EventCard = ({ active, data }) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-6 shadow-sm`}>
      <div className="w-full lg:w-[45%] m-auto">
        <img
          src={data?.images && data.images[0]?.url}
          alt={data?.name}
          className="w-full max-h-[300px] object-contain"
        />
      </div>
      <div className="w-full lg:w-[55%] flex flex-col justify-center lg:pl-10">
        <h2 className={`${styles.productTitle} text-xl sm:text-2xl font-[600]`}>{data?.name}</h2>
        <p className="text-gray-600 text-[15px] leading-relaxed my-3">
          {data?.description && data.description.length > 250
            ? data.description.slice(0, 250) + "..."
            : data?.description}
        </p>
        <div className="flex py-2 justify-between items-center border-t border-b border-gray-100 my-4">
          <div className="flex items-center">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice}$
            </h5>
            <h5 className="font-bold text-[22px] text-[#333] font-Roboto">
              {data?.discountPrice}$
            </h5>
          </div>
          <span className="font-[400] text-[16px] text-[#44a55e]">
            {data?.sold_out || 0} sold
          </span>
        </div>
        <div className="flex gap-4">
          <Link to={`/product/${data?._id}?isEvent=true`} className={`${styles.button} !rounded-md`}>
            <span className="text-white font-[500]">See Details</span>
          </Link>
          <div className={`${styles.button} !bg-[#3bc173] !rounded-md`}>
            <span className="text-white font-[500]">Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
