import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full h-[80px] bg-white shadow-sm sticky top-0 left-0 z-30 flex items-center justify-between px-6 border-b">
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="Logo"
            className="w-[120px] object-contain"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/dashboard-coupouns" title="Coupons">
          <AiOutlineGift size={30} className="text-[#555] hover:text-red-500 transition" />
        </Link>
        <Link to="/dashboard-events" title="Events">
          <MdOutlineLocalOffer
            size={30}
            className="text-[#555] hover:text-red-500 transition"
          />
        </Link>
        <Link to="/dashboard-products" title="Products">
          <FiShoppingBag size={30} className="text-[#555] hover:text-red-500 transition" />
        </Link>
        <Link to="/dashboard-orders" title="Orders">
          <FiPackage size={30} className="text-[#555] hover:text-red-500 transition" />
        </Link>
        <Link to="/dashboard-messages" title="Messages">
          <BiMessageSquareDetail
            size={30}
            className="text-[#555] hover:text-red-500 transition"
          />
        </Link>
        {seller && (
          <Link to={`/shop/${seller._id}`}>
            <img
              src={seller.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
              alt="Seller Avatar"
              className="w-[45px] h-[45px] rounded-full object-cover border"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
