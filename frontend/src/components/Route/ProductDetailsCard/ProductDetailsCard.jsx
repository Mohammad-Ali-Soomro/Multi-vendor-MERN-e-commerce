import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import styles from "../../../styles/styles";

const ProductDetailsCard = ({ setOpen, data }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const handleMessageSubmit = () => {
    // Empty for now
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (data.stock && count >= data.stock) {
      toast.error("Product stock limited!");
    } else {
      setCount(count + 1);
    }
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        dispatch(addTocart({ ...data, qty: count }));
        toast.success("Item added to cart successfully!");
      }
    }
  };

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

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4 800px:p-10 transition-all duration-300">
            <RxCross1
              size={30}
              className="absolute right-4 top-4 z-50 cursor-pointer text-gray-700 hover:text-black"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex mt-4">
              {/* Image side */}
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.images && data.images[0]?.url}
                  alt=""
                  className="w-full h-[300px] object-contain"
                />
                <div className="flex items-center mt-5">
                  <Link to={`/shop/preview/${data.shop?._id}`}>
                    <img
                      src={data.shop?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full object-cover mr-3"
                    />
                  </Link>
                  <div>
                    <Link to={`/shop/preview/${data.shop?._id}`}>
                      <h3 className={`${styles.shop_name} !pb-0`}>
                        {data.shop?.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px] text-[#333] font-[400]">
                      ({data.shop?.ratings || 0}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} !bg-[#000] !rounded-[4px] mt-4`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center font-[500]">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-red-500 mt-5">
                  ({data.sold_out || 0}) Sold out
                </h5>
              </div>

              {/* Info side */}
              <div className="w-full 800px:w-[50%] pt-5 800px:pt-0 800px:pl-[30px]">
                <h1 className={`${styles.productTitle} text-[20px] font-[600]`}>
                  {data.name}
                </h1>
                <p className="text-gray-600 text-[15px] my-3 leading-relaxed">
                  {data.description && data.description.length > 300
                    ? data.description.slice(0, 300) + "..."
                    : data.description}
                </p>

                <div className="flex pt-3 items-center">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice || data.originalPrice}$
                  </h4>
                  {data.discountPrice && (
                    <h3 className={`${styles.price}`}>{data.originalPrice}$</h3>
                  )}
                </div>

                <div className="flex items-center justify-between mt-8 pr-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist toggle */}
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer text-red-500"
                        onClick={() => removeFromWishlistHandler(data)}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer text-[#333]"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div
                  className={`${styles.button} !mt-10 !bg-[#3957db] !rounded-[4px] !h-[45px]`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center font-[500]">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
