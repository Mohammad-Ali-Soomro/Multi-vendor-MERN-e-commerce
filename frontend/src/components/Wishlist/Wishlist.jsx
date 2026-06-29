import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { addTocart } from "../../redux/actions/cart";
import { removeFromWishlist } from "../../redux/actions/wishlist";

const Wishlist = ({ setOpenWishlist }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    dispatch(addTocart({ ...data, qty: 1 }));
    setOpenWishlist(false);
    toast.success("Item added to cart successfully!");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50 flex justify-end">
      <div className="w-full sm:w-[400px] h-full bg-white flex flex-col justify-between shadow-xl relative transition-all duration-300">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <AiOutlineHeart size={25} className="text-red-500" />
              <h5 className="pl-2 text-[20px] font-[500] text-gray-800">
                {wishlist ? wishlist.length : 0} items
              </h5>
            </div>
            <RxCross1
              size={25}
              className="cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setOpenWishlist(false)}
            />
          </div>

          {/* Empty wishlist */}
          {wishlist && wishlist.length === 0 ? (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
              <h5 className="text-[18px] text-gray-500 font-[500]">
                Your wishlist is empty!
              </h5>
            </div>
          ) : (
            // List of items
            <div className="overflow-y-scroll max-h-[80vh]">
              {wishlist &&
                wishlist.map((item, index) => (
                  <WishlistSingle
                    key={index}
                    data={item}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WishlistSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      {/* Remove from wishlist */}
      <RxCross1
        size={20}
        className="cursor-pointer text-gray-400 hover:text-black mr-2"
        onClick={() => removeFromWishlistHandler(data)}
        title="Remove item"
      />

      {/* Image */}
      <img
        src={data.images && data.images[0]?.url}
        alt=""
        className="w-[80px] h-[80px] object-contain ml-3 rounded"
      />

      {/* Name and Price */}
      <div className="flex-1 pl-3">
        <h1 className="font-[500] text-[15px] text-gray-800">
          {data.name.length > 30 ? data.name.slice(0, 30) + "..." : data.name}
        </h1>
        <h4 className="font-[600] text-[16px] text-[#d55b45] pt-[2px]">
          ${data.discountPrice || data.originalPrice}
        </h4>
      </div>

      {/* Add to cart icon */}
      <AiOutlineShoppingCart
        size={25}
        className="cursor-pointer text-[#444] hover:text-[#3957db] transition ml-2"
        onClick={() => addToCartHandler(data)}
        title="Add to cart"
      />
    </div>
  );
};

export default Wishlist;
