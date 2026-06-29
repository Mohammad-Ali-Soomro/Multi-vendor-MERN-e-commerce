import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

import { getAllProductsShop } from "../../redux/actions/product";
import { addTocart } from "../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { server } from "../../server";
import styles from "../../styles/styles";
import Ratings from "./Ratings";

const ProductDetails = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  const [select, setSelect] = useState(0);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (data && data.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
    if (data && wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [dispatch, data, wishlist]);

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

  const handleMessageSubmit = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to send message!");
      return;
    }
    try {
      const groupTitle = data._id + user._id;
      const { data: resData } = await axios.post(
        `${server}/conversation/create-new-conversation`,
        {
          groupTitle,
          userId: user._id,
          sellerId: data.shop._id,
        }
      );
      navigate(`/inbox?conversationId=${resData.conversation._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Conversation setup failed!");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] py-10`}>
          <div className="w-full block 800px:flex">
            {/* Gallery Left */}
            <div className="w-full 800px:w-[50%]">
              <img
                src={data.images && data.images[select]?.url}
                alt=""
                className="w-[80%] h-[350px] object-contain m-auto"
              />
              <div className="w-full flex justify-center gap-2 mt-5">
                {data.images &&
                  data.images.map((img, index) => (
                    <div
                      key={index}
                      className={`${
                        select === index ? "border-[#3851db]" : "border-gray-200"
                      } border-[2px] cursor-pointer rounded overflow-hidden`}
                      onClick={() => setSelect(index)}
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="w-[70px] h-[70px] object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Info Right */}
            <div className="w-full 800px:w-[50%] pt-8 800px:pt-0 pl-[10px]">
              <h1 className={`${styles.productTitle} text-[24px] font-[600]`}>
                {data.name}
              </h1>
              <p className="text-gray-600 text-[15px] my-3 leading-relaxed">
                {data.description}
              </p>

              <div className="flex pt-3 items-center">
                <h4 className={`${styles.productDiscountPrice} text-[22px]`}>
                  {data.discountPrice || data.originalPrice}$
                </h4>
                {data.discountPrice && (
                  <h3 className={`${styles.price} text-[18px]`}>
                    {data.originalPrice}$
                  </h3>
                )}
              </div>

              <div className="flex items-center justify-between mt-8 pr-3">
                {/* Qty Counter */}
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

              {/* Shop info row */}
              <div className="flex items-center mt-12 border-t pt-5">
                <Link to={`/shop/preview/${data.shop?._id}`}>
                  <img
                    src={data.shop?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover border"
                  />
                </Link>
                <div className="pl-3">
                  <Link to={`/shop/preview/${data.shop?._id}`}>
                    <h3 className={`${styles.shop_name} !pb-0 font-semibold`}>
                      {data.shop?.name}
                    </h3>
                  </Link>
                  <h5 className="text-[15px] text-[#333] font-[400]">
                    ({data.shop?.ratings || 0}) Ratings
                  </h5>
                </div>
                <div
                  className={`${styles.button} !bg-[#000] !rounded-[4px] !h-[40px] ml-auto`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center font-[500]">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
          <ProductDetailsInfo data={data} products={products} />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data, products }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-5 rounded">
      <div className="w-full flex justify-between border-b pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && <div className={`${styles.active_indicator}`} />}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`} />}
        </div>
      </div>

      {active === 1 && (
        <p className="py-5 text-[18px] leading-8 text-gray-700 font-sans whitespace-pre-line">
          {data.description}
        </p>
      )}

      {active === 2 && (
        <div className="w-full min-h-[30vh] flex flex-col items-center justify-center">
          {data.reviews && data.reviews.length !== 0 ? (
            data.reviews.map((item, index) => (
              <div className="w-full flex my-3 border-b pb-3" key={index}>
                <img
                  src={item.user?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
                  alt=""
                  className="w-[45px] h-[45px] rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.user?.name}</h4>
                  <Ratings rating={item.rating} />
                  <p className="text-gray-600 text-sm mt-1">{item.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-gray-500 font-[500]">No reviews yet!</h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <Link to={`/shop/preview/${data.shop?._id}`}>
                <img
                  src={data.shop?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
                  alt=""
                  className="w-[60px] h-[60px] rounded-full object-cover border"
                />
              </Link>
              <div className="pl-3">
                <Link to={`/shop/preview/${data.shop?._id}`}>
                  <h3 className="text-[18px] font-[600] text-gray-800">
                    {data.shop?.name}
                  </h3>
                </Link>
                <h5 className="text-[15px] text-[#333] font-[400]">
                  ({data.shop?.ratings || 0}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-4 text-gray-600 leading-relaxed">
              {data.shop?.description || "No description provided."}
            </p>
          </div>

          <div className="w-full 800px:w-[50%] pt-5 800px:pt-0 800px:pl-[30px] flex flex-col justify-end text-right">
            <h5 className="text-gray-700">
              Joined on:{" "}
              <span className="font-semibold">
                {data.shop?.createdAt ? data.shop.createdAt.slice(0, 10) : "N/A"}
              </span>
            </h5>
            <h5 className="text-gray-700 mt-2">
              Total Products:{" "}
              <span className="font-semibold">
                {products ? products.length : 0}
              </span>
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
