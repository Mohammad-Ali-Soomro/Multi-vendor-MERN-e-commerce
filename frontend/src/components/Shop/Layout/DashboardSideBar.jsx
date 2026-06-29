import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard as DashboardIcon } from "react-icons/rx";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  const menuItems = [
    { id: 1, name: "Dashboard", link: "/dashboard", icon: <DashboardIcon size={22} /> },
    { id: 2, name: "All Orders", link: "/dashboard-orders", icon: <FiShoppingBag size={22} /> },
    { id: 3, name: "All Products", link: "/dashboard-products", icon: <FiPackage size={22} /> },
    {
      id: 4,
      name: "Create Product",
      link: "/dashboard-create-product",
      icon: <AiOutlineFolderAdd size={22} />,
    },
    {
      id: 5,
      name: "All Events",
      link: "/dashboard-events",
      icon: <MdOutlineLocalOffer size={22} />,
    },
    {
      id: 6,
      name: "Create Event",
      link: "/dashboard-create-event",
      icon: <VscNewFile size={22} />,
    },
    {
      id: 7,
      name: "Withdraw Money",
      link: "/dashboard-withdraw-money",
      icon: <CiMoneyBill size={22} />,
    },
    {
      id: 8,
      name: "Shop Inbox",
      link: "/dashboard-messages",
      icon: <BiMessageSquareDetail size={22} />,
    },
    {
      id: 9,
      name: "Discount Codes",
      link: "/dashboard-coupouns",
      icon: <AiOutlineGift size={22} />,
    },
    {
      id: 10,
      name: "Refunds",
      link: "/dashboard-refunds",
      icon: <HiOutlineReceiptRefund size={22} />,
    },
    { id: 11, name: "Settings", link: "/settings", icon: <CiSettings size={22} /> },
  ];

  return (
    <div className="w-full bg-white h-[89vh] shadow-sm sticky top-[80px] left-0 z-10 p-4 space-y-5 border-r overflow-y-scroll scrollbar-thin">
      {menuItems.map((item) => (
        <div key={item.id} className="w-full flex items-center">
          <Link
            to={item.link}
            className="flex items-center w-full transition"
            style={{ color: active === item.id ? "crimson" : "#555" }}
          >
            {item.icon}
            <span className="pl-3 font-[500] text-[16px] block 800px:block hidden">
              {item.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashboardSideBar;
