import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";

import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import { categoriesData } from "../../static/data";
import { createevent } from "../../redux/actions/event";
import styles from "../../styles/styles";

const ShopCreateEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEventForm />
        </div>
      </div>
    </div>
  );
};

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please select event images!");
      return;
    }

    const eventData = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images,
      start_Date: startDate,
      Finish_Date: endDate,
    };

    dispatch(createevent(eventData));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow-sm border rounded-[5px] p-6 my-8 h-[80vh] overflow-y-scroll">
      <h5 className="text-[25px] font-[600] text-gray-800 text-center font-Poppins border-b pb-3 mb-6">
        Create Promotional Event
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter event name..."
            className={`${styles.input} !h-[40px]`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Event Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            cols="30"
            rows="5"
            placeholder="Enter event description..."
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-[100px] resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            required
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose category</option>
            {categoriesData.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">Tags</label>
          <input
            type="text"
            placeholder="Enter tags (comma separated)..."
            className={`${styles.input} !h-[40px]`}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 pb-1">Original Price</label>
            <input
              type="number"
              placeholder="Enter original price..."
              className={`${styles.input} !h-[40px]`}
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Discount Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              placeholder="Enter discount price..."
              className={`${styles.input} !h-[40px]`}
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 pb-1">Event Start Date</label>
            <input
              type="date"
              required
              className={`${styles.input} !h-[40px]`}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 pb-1">Event End Date</label>
            <input
              type="date"
              required
              className={`${styles.input} !h-[40px]`}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter product stock..."
            className={`${styles.input} !h-[40px]`}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Upload Event Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
          <div className="w-full flex flex-wrap items-center mt-2 gap-3">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="cursor-pointer text-gray-500 hover:text-blue-500 transition" />
            </label>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className="w-[80px] h-[80px] object-cover rounded border"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-[45px] bg-[#3957db] text-white rounded-md font-semibold hover:bg-[#2b44b2] transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default ShopCreateEvents;
