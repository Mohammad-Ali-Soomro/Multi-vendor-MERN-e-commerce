import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import styles from "../../../styles/styles";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer hover:shadow-md transition duration-200">
      <div className="flex justify-end"></div>
      <Link to={`/product/${data._id}`}>
        <img
          src={data.images && data.images[0]?.url}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to="/">
        <h5 className={`${styles.shop_name}`}>{data.shop?.name || "Shop Name"}</h5>
      </Link>
      <Link to={`/product/${data._id}`}>
        <h4 className="pb-3 font-[500] text-gray-800 hover:text-blue-600 transition">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
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
            onClick={() => setClick(!click)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5 text-[#333]"
            onClick={() => setClick(!click)}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-12 text-[#333]"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-20 text-[#444] hover:text-[#3957db]"
          title="Add to cart"
        />
      </div>
    </div>
  );
};

export default ProductCard;
