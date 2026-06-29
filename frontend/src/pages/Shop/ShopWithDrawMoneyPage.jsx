import React from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopWithDrawMoneyPage = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <div className="w-full justify-center flex p-8">
          <div className="w-[90%] 800px:w-[50%] bg-white border shadow-sm rounded p-6 text-center space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 font-Poppins">
              Withdraw Earnings
            </h3>
            <div>
              <p className="text-gray-500 text-sm">Available Account Balance</p>
              <h4 className="text-3xl font-extrabold text-emerald-600 mt-2">
                ${seller?.availableBalance ? seller.availableBalance.toFixed(2) : "0.00"}
              </h4>
            </div>
            <button className="w-full py-3 bg-emerald-600 text-white rounded font-semibold hover:bg-emerald-700 transition">
              Withdraw to Bank
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopWithDrawMoneyPage;
