import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { AiOutlineSetting } from "react-icons/ai";

const AdminSideBar = ({ active }) => {
  const sideBarItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: <RxDashboard size={22} />,
      link: "/admin/dashboard",
    },
    {
      id: 2,
      title: "All Orders",
      icon: <FiShoppingBag size={22} />,
      link: "/admin-orders",
    },
    {
      id: 3,
      title: "All Sellers",
      icon: <GrWorkshop size={22} />,
      link: "/admin-sellers",
    },
    {
      id: 4,
      title: "All Users",
      icon: <HiOutlineUserGroup size={22} />,
      link: "/admin-users",
    },
    {
      id: 5,
      title: "All Products",
      icon: <BsHandbag size={22} />,
      link: "/admin-products",
    },
    {
      id: 6,
      title: "All Events",
      icon: <MdOutlineLocalOffer size={22} />,
      link: "/admin-events",
    },
    {
      id: 7,
      title: "Withdraw Request",
      icon: <CiMoneyBill size={22} />,
      link: "/admin-withdraw-request",
    },
    {
      id: 8,
      title: "Settings",
      icon: <AiOutlineSetting size={22} />,
      link: "/profile",
    },
  ];

  return (
    <div className="w-full h-[90vh] bg-white shadow-sm border-r sticky top-0 left-0 p-4 space-y-4">
      {sideBarItems.map((item) => (
        <Link key={item.id} to={item.link}>
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <span
              style={{
                color: active === item.id ? "crimson" : "#555",
              }}
            >
              {item.icon}
            </span>
            <h5
              className="hidden 800px:block text-[15px] font-[500]"
              style={{
                color: active === item.id ? "crimson" : "#555",
              }}
            >
              {item.title}
            </h5>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminSideBar;
