import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

import { loadSeller } from "../../redux/actions/user";
import { server } from "../../server";
import styles from "../../styles/styles";

const ShopSettings = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  const [name, setName] = useState(seller?.name || "");
  const [description, setDescription] = useState(seller?.description || "");
  const [address, setAddress] = useState(seller?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
  const [zipCode, setZipCode] = useState(seller?.zipCode || "");

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        try {
          await axios.put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          );
          toast.success("Shop avatar updated successfully!");
          dispatch(loadSeller());
        } catch (err) {
          toast.error(err.response?.data?.message || "Avatar update failed!");
        }
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${server}/shop/update-seller-info`,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
        },
        { withCredentials: true }
      );
      toast.success("Shop information updated successfully!");
      dispatch(loadSeller());
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update shop!");
    }
  };

  return (
    <div className="w-[95%] sm:w-[80%] 1000px:w-[50%] bg-white shadow-sm border rounded-[5px] p-6 my-8">
      {/* Avatar with Camera Overlay */}
      <div className="flex flex-col items-center border-b pb-6 mb-6">
        <div className="relative">
          <img
            src={seller?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
            alt=""
            className="w-[120px] h-[120px] rounded-full object-cover border-[3px] border-blue-500 shadow-sm"
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={handleImage}
              accept="image/*"
            />
            <label htmlFor="avatar">
              <AiOutlineCamera className="cursor-pointer" size={18} />
            </label>
          </div>
        </div>
        <h4 className="text-[18px] font-[600] text-gray-800 mt-2">{seller?.name}</h4>
      </div>

      {/* Editing Form */}
      <form onSubmit={updateHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">Shop Name</label>
          <input
            type="text"
            required
            className={`${styles.input} !h-[40px]`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">Shop Description</label>
          <textarea
            cols="30"
            rows="4"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-[80px] resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your shop..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">Address</label>
          <input
            type="text"
            required
            className={`${styles.input} !h-[40px]`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 pb-1">Phone Number</label>
            <input
              type="number"
              required
              className={`${styles.input} !h-[40px]`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 pb-1">Zip Code</label>
            <input
              type="number"
              required
              className={`${styles.input} !h-[40px]`}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-[45px] bg-[#3957db] text-white rounded-md font-semibold hover:bg-[#2b44b2] transition"
        >
          Update Shop Info
        </button>
      </form>
    </div>
  );
};

export default ShopSettings;
