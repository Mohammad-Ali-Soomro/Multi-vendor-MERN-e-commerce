import React from "react";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center mt-5">
      <div className="w-[90%] 800px:w-[50%] flex items-center justify-between flex-wrap gap-2 px-4 py-3 bg-white shadow rounded-md">
        {/* Step 1: Shipping */}
        <div className="flex items-center">
          <div className="h-[38px] px-5 rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer">
            <span className="text-[#fff] text-[16px] font-[600]">1. Shipping</span>
          </div>
        </div>

        {/* Divider 1 */}
        <div
          className={`w-[30px] 800px:w-[70px] h-[4px] ${
            active > 1 ? "bg-[#f63b60]" : "bg-[#f9cbd3]"
          }`}
        />

        {/* Step 2: Payment */}
        <div className="flex items-center">
          <div
            className={`h-[38px] px-5 rounded-[20px] ${
              active >= 2 ? "bg-[#f63b60]" : "bg-[#f9cbd3]"
            } flex items-center justify-center cursor-pointer`}
          >
            <span
              className={`${
                active >= 2 ? "text-[#fff]" : "text-[#f63b60]"
              } text-[16px] font-[600]`}
            >
              2. Payment
            </span>
          </div>
        </div>

        {/* Divider 2 */}
        <div
          className={`w-[30px] 800px:w-[70px] h-[4px] ${
            active > 2 ? "bg-[#f63b60]" : "bg-[#f9cbd3]"
          }`}
        />

        {/* Step 3: Success */}
        <div className="flex items-center">
          <div
            className={`h-[38px] px-5 rounded-[20px] ${
              active >= 3 ? "bg-[#f63b60]" : "bg-[#f9cbd3]"
            } flex items-center justify-center cursor-pointer`}
          >
            <span
              className={`${
                active >= 3 ? "text-[#fff]" : "text-[#f63b60]"
              } text-[16px] font-[600]`}
            >
              3. Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
