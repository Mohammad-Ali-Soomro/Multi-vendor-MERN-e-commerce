import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { addTocart } from "../../redux/actions/cart";
import CountDown from "./CountDown";

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
    <div className={`flex flex-col 800px:flex-row gap-8 bg-white rounded-3xl overflow-hidden ${active ? '' : 'mb-12'}`}>
      <div className="w-full 800px:w-[45%] bg-cream-dark rounded-3xl overflow-hidden min-h-[280px] flex items-center justify-center">
        <img 
          src={data?.images?.[0]?.url} 
          alt={data?.name}
          className="w-full h-full object-contain p-8"
        />
      </div>
      
      <div className="flex-1 p-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="badge-new">SALE EVENT</span>
          <span className="font-sans text-sm text-text-muted">Limited stock</span>
        </div>
        
        <h2 className="font-editorial text-2xl 800px:text-3xl font-bold text-dark mb-3 leading-tight">
          {data?.name}
        </h2>
        <p className="font-sans text-text-muted text-sm leading-relaxed mb-6">
          {data?.description}
        </p>
        
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-editorial text-3xl font-bold text-dark">${data?.discountPrice}</span>
          {data?.originalPrice && (
            <span className="font-sans text-text-muted line-through text-lg">${data?.originalPrice}</span>
          )}
          <span className="font-sans text-sm text-emerald-600 font-medium">{data?.sold_out || 0} sold</span>
        </div>

        {/* Countdown */}
        <div className="bg-dark rounded-2xl p-4 mb-6 inline-flex gap-4">
          <CountDown data={data} />
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <button className="btn-outline-dark text-sm py-3 px-6">
              View Details
            </button>
          </Link>
          <button 
            className="btn-lavender text-sm py-3 px-6"
            onClick={addToCartHandler}
          >
            <AiOutlineShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
