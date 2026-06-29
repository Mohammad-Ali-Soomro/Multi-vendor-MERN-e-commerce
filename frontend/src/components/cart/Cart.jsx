import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";

const Cart = ({ setOpenCart }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-50 flex justify-end">
      <div className="w-full sm:w-[400px] h-full bg-white flex flex-col justify-between p-5 shadow-xl transition-all duration-300">
        <div>
          <div className="flex justify-end cursor-pointer" onClick={() => setOpenCart(false)}>
            <RxCross1 size={25} className="text-gray-600 hover:text-black" />
          </div>
          <div className="flex items-center p-4 border-b">
            <IoBagHandleOutline size={25} className="text-gray-700" />
            <h5 className="pl-2 text-[20px] font-[500] text-gray-800">Your Cart (0 items)</h5>
          </div>
          <div className="p-4 text-center text-gray-500 mt-20">
            Your shopping cart is empty!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
