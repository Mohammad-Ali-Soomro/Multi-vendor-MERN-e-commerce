import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { toast } from "react-toastify";

import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import Ratings from "../../Products/Ratings";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const ProductCard = ({ data, isEvent }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data && wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data]);

  if (!data) return null;

  const addToWishlistHandler = (item) => {
    setClick(true);
    dispatch(addToWishlist(item));
    toast.success("Added to wishlist!");
  };

  const removeFromWishlistHandler = (item) => {
    setClick(false);
    dispatch(removeFromWishlist(item));
    toast.success("Removed from wishlist!");
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product out of stock!");
      } else {
        dispatch(addTocart({ ...data, qty: 1 }));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="product-card-editorial group">
        {/* Image container */}
        <div className="relative overflow-hidden bg-cream-dark rounded-t-[20px]" style={{aspectRatio:'1/1'}}>
          <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
            <img
              src={data.images?.[0]?.url}
              alt={data.name}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Action buttons that appear on hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
            <button
              className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-lavender transition-colors"
              onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
              title={click ? "Remove from wishlist" : "Add to wishlist"}
            >
              {click 
                ? <AiFillHeart size={16} color="#0D1F1A" /> 
                : <AiOutlineHeart size={16} color="#0D1F1A" />
              }
            </button>
            <button
              className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-lavender transition-colors"
              onClick={() => setOpen(!open)}
              title="Quick view"
            >
              <AiOutlineEye size={16} color="#0D1F1A" />
            </button>
            <button
              className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-lavender transition-colors"
              onClick={() => addToCartHandler(data._id)}
              title="Add to cart"
            >
              <AiOutlineShoppingCart size={16} color="#0D1F1A" />
            </button>
          </div>

          {/* Discount badge */}
          {data.originalPrice && data.discountPrice && data.originalPrice > data.discountPrice && (
            <div className="absolute top-3 left-3">
              <span className="badge-sale text-xs">
                -{Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <Link to={`/shop/preview/${data?.shop?._id}`}>
            <p className="font-sans text-xs text-text-muted font-medium mb-1 hover:text-forest transition-colors">
              {data.shop?.name}
            </p>
          </Link>

          <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
            <h3 className="font-editorial font-semibold text-dark text-[15px] leading-snug mb-2 line-clamp-2 hover:text-forest transition-colors">
              {data.name}
            </h3>
          </Link>

          <div className="flex items-center mb-3">
            <Ratings rating={data?.ratings} />
            <span className="font-sans text-xs text-text-muted ml-1">({data.reviews?.length || 0})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-editorial font-bold text-[17px] text-dark">
                ${data.discountPrice || data.originalPrice}
              </span>
              {data.originalPrice && data.discountPrice && (
                <span className="font-sans text-[12px] text-text-muted line-through">
                  ${data.originalPrice}
                </span>
              )}
            </div>
            <span className="font-sans text-[11px] text-text-muted">
              {data.sold_out} sold
            </span>
          </div>
        </div>
      </div>

      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </>
  );
};

export default ProductCard;
