import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4 sm:px-10">
      <div>
        <Link to="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="logo"
            className="h-[40px]"
          />
        </Link>
      </div>

      <div className="flex items-center gap-5 sm:gap-8">
        <Link to="/dashboard/coupouns" title="Coupons">
          <AiOutlineGift
            color="#555"
            size={30}
            className="cursor-pointer hover:text-[#3321c8] transition"
          />
        </Link>
        <Link to="/dashboard-events" title="Events">
          <MdOutlineLocalOffer
            color="#555"
            size={30}
            className="cursor-pointer hover:text-[#3321c8] transition"
          />
        </Link>
        <Link to="/dashboard-products" title="Products">
          <FiShoppingBag
            color="#555"
            size={30}
            className="cursor-pointer hover:text-[#3321c8] transition"
          />
        </Link>
        <Link to="/dashboard-orders" title="Orders">
          <FiPackage
            color="#555"
            size={30}
            className="cursor-pointer hover:text-[#3321c8] transition"
          />
        </Link>
        <Link to="/dashboard-messages" title="Messages">
          <BiMessageSquareDetail
            color="#555"
            size={30}
            className="cursor-pointer hover:text-[#3321c8] transition"
          />
        </Link>
        <Link to="/profile">
          <img
            src={user?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
            alt="avatar"
            className="w-[45px] h-[45px] rounded-full object-cover border border-[#3321c8]"
          />
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
