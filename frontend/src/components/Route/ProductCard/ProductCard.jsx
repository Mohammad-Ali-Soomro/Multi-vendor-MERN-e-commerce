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
import styles from "../../../styles/styles";
import Ratings from "../../Products/Ratings";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const ProductCard = ({ data, isEvent }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

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
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer hover:shadow-md transition duration-200">
      <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
        <img
          src={data.images && data.images[0]?.url}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/shop/preview/${data.shop?._id}`}>
        <h5 className={`${styles.shop_name}`}>{data.shop?.name || "Shop Name"}</h5>
      </Link>
      <Link to={isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}>
        <h4 className="pb-2 font-[500] text-gray-800 hover:text-blue-600 transition">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        
        {/* Rating component */}
        <div className="flex pb-2">
          <Ratings rating={data.ratings || 0} />
        </div>

        <div className="flex items-center justify-between pb-3">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.discountPrice || data.originalPrice}$
            </h5>
            {data.discountPrice && (
              <h4 className={`${styles.price}`}>
                {data.originalPrice}$
              </h4>
            )}
          </div>
          <span className="font-[400] text-[15px] text-[#68d284]">
            {data.sold_out || 0} sold
          </span>
        </div>
      </Link>

      {/* Side Action Buttons */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5 text-red-500"
            onClick={() => removeFromWishlistHandler(data)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5 text-[#333]"
            onClick={() => addToWishlistHandler(data)}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-12 text-[#333] hover:text-[#3957db] transition"
          onClick={() => setOpen(true)}
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-20 text-[#444] hover:text-[#3957db] transition"
          onClick={() => addToCartHandler(data._id)}
          title="Add to cart"
        />
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

export default ProductCard;
