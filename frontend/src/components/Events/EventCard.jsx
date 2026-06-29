import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { addTocart } from "../../redux/actions/cart";
import CountDown from "./CountDown";
import styles from "../../styles/styles";

const EventCard = ({ active, data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const addToCartHandler = () => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
      return;
    }

    if (data.stock < 1) {
      toast.error("Product stock limited!");
      return;
    }

    dispatch(addTocart({ ...data, qty: 1 }));
    toast.success("Item added to cart successfully!");
  };

  return (
    <div className={`w-full block bg-white rounded-lg border p-4 ${active ? "unset" : "mb-10"} 800px:flex gap-6`}>
      {/* Left Image Section */}
      <div className="w-full 800px:w-[50%] flex justify-center">
        <img
          src={data?.images && data.images[0]?.url}
          alt={data?.name}
          className="w-full max-h-[350px] object-contain rounded"
        />
      </div>

      {/* Right Details Section */}
      <div className="w-full 800px:w-[50%] flex flex-col justify-between py-2 space-y-4">
        <div className="space-y-2">
          <h2 className="text-[20px] font-[600] text-gray-800 font-Poppins">
            {data?.name}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {data?.description}
          </p>
        </div>

        {/* Pricing & Sold Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h5 className="font-bold text-[18px] text-[#333]">
              ${data?.discountPrice}
            </h5>
            <h5 className="font-[500] text-[15px] text-[#d55b45] line-through">
              ${data?.originalPrice}
            </h5>
          </div>
          <span className="text-[14px] text-[#44a55e] font-[600]">
            {data?.sold_out || 0} sold
          </span>
        </div>

        {/* CountDown Timer */}
        <div className="border-t border-b py-3">
          <CountDown data={data} />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Link to={`/product/${data?._id}?isEvent=true`} className="w-[150px]">
            <div className="w-full h-[40px] bg-gray-900 text-white rounded font-semibold flex items-center justify-center hover:bg-black transition text-sm">
              See Details
            </div>
          </Link>
          <button
            onClick={addToCartHandler}
            className="w-[150px] h-[40px] bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
