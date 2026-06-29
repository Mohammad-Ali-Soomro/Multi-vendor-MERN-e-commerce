import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingBag, HiOutlineReceiptRefund } from "react-icons/hi";
import { AiOutlineMessage, AiOutlineLogin } from "react-icons/ai";
import { MdOutlineTrackChanges, MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";

import { server } from "../../server";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/user/logout`, { withCredentials: true });
      toast.success("Logged out successfully!");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed!");
    }
  };

  const menuItems = [
    { id: 1, name: "Profile", icon: <RxPerson size={20} /> },
    { id: 2, name: "Orders", icon: <HiOutlineShoppingBag size={20} /> },
    { id: 3, name: "Refunds", icon: <HiOutlineReceiptRefund size={20} /> },
    { id: 4, name: "Inbox", icon: <AiOutlineMessage size={20} /> },
    { id: 5, name: "Track Order", icon: <MdOutlineTrackChanges size={20} /> },
    { id: 6, name: "Change Password", icon: <RiLockPasswordLine size={20} /> },
    { id: 7, name: "Address", icon: <TbAddressBook size={20} /> },
  ];

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 space-y-4">
      {menuItems.map((item) => {
        const isInbox = item.id === 4;
        const clickHandler = () => {
          setActive(item.id);
          if (isInbox) {
            navigate("/inbox");
          }
        };

        return (
          <div
            key={item.id}
            className="flex items-center cursor-pointer w-full hover:opacity-100 transition"
            onClick={clickHandler}
            style={{ color: active === item.id ? "red" : "#555" }}
          >
            {item.icon}
            <span
              className={`pl-3 font-[500] ${
                active === item.id ? "font-[600]" : ""
              } block 800px:block hidden`}
            >
              {item.name}
            </span>
          </div>
        );
      })}

      {user && user.role === "Admin" && (
        <Link
          to="/admin/dashboard"
          className="flex items-center cursor-pointer w-full text-[#555] hover:opacity-100 transition"
        >
          <MdOutlineAdminPanelSettings size={20} />
          <span className="pl-3 font-[500] block 800px:block hidden">Admin Dashboard</span>
        </Link>
      )}

      <div
        className="flex items-center cursor-pointer w-full text-[#555] hover:opacity-100 transition"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} />
        <span className="pl-3 font-[500] block 800px:block hidden">Log out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
