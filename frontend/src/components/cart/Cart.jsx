import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { addTocart, removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * (item.discountPrice || item.originalPrice),
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50 flex justify-end">
      <div className="w-full sm:w-[400px] h-full bg-white flex flex-col justify-between shadow-xl relative transition-all duration-300">
        <div>
          {/* Close button */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <IoBagHandleOutline size={25} className="text-gray-700" />
              <h5 className="pl-2 text-[20px] font-[500] text-gray-800">
                {cart ? cart.length : 0} items
              </h5>
            </div>
            <RxCross1
              size={25}
              className="cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* Empty cart warning */}
          {cart && cart.length === 0 ? (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center">
              <h5 className="text-[18px] text-gray-500 font-[500]">
                Your cart is empty!
              </h5>
            </div>
          ) : (
            // Cart items list
            <div className="overflow-y-scroll max-h-[70vh]">
              {cart &&
                cart.map((item, index) => (
                  <CartSingle
                    key={index}
                    data={item}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Checkout Button */}
        {cart && cart.length > 0 && (
          <div className="p-5 border-t">
            <Link to="/checkout" onClick={() => setOpenCart(false)}>
              <div className="w-full h-[50px] bg-[#e44343] rounded-[5px] flex items-center justify-center text-white text-[18px] font-[600] hover:bg-[#d03a3a] transition cursor-pointer">
                Checkout Now (${totalPrice})
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = (data.discountPrice || data.originalPrice) * value;

  const increment = () => {
    if (data.stock && value >= data.stock) {
      toast.error("Product stock limit reached!");
    } else {
      const newValue = value + 1;
      setValue(newValue);
      quantityChangeHandler({ ...data, qty: newValue });
    }
  };

  const decrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      quantityChangeHandler({ ...data, qty: newValue });
    }
  };

  return (
    <div className="border-b p-4 flex items-center justify-between">
      {/* Qty controller */}
      <div className="flex flex-col items-center justify-center">
        <div
          className="bg-[#e44343] border border-[#e44343] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer text-white hover:bg-[#d03a3a]"
          onClick={increment}
        >
          <HiPlus size={16} />
        </div>
        <span className="py-[4px] font-[500] text-[16px] text-gray-700">
          {value}
        </span>
        <div
          className="bg-[#a7abb9] border border-[#a7abb9] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer text-white hover:bg-[#9296a5]"
          onClick={decrement}
        >
          <HiOutlineMinus size={16} />
        </div>
      </div>

      {/* Thumbnail image */}
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
        <span className="text-[14px] text-gray-500">
          {data.discountPrice || data.originalPrice}$ * {value}
        </span>
        <h4 className="font-[600] text-[16px] text-[#d55b45] pt-[2px]">
          ${totalPrice}
        </h4>
      </div>

      {/* Remove button */}
      <RxCross1
        size={20}
        className="cursor-pointer text-gray-400 hover:text-black ml-2"
        onClick={() => removeFromCartHandler(data)}
        title="Remove item"
      />
    </div>
  );
};

// Simple helper state hook inside single component
const useState = React.useState;

export default Cart;
