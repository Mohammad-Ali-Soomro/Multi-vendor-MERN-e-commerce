import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";

const ShopAllCoupouns = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex p-8">
          <div className="w-full bg-white border shadow-sm rounded p-8 min-h-[60vh] flex items-center justify-center">
            <h5 className="text-gray-500 font-semibold text-lg">Discount Coupons panel</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupouns;
