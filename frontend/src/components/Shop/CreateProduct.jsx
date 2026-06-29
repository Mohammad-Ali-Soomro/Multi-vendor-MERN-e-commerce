import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";

import { categoriesData } from "../../static/data";
import { createProduct } from "../../redux/actions/product";
import styles from "../../styles/styles";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please select at least one product image!");
      return;
    }

    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };

  return (
    <div className="w-[95%] sm:w-[80%] 1000px:w-[50%] bg-white shadow-sm border rounded-[5px] p-6 my-8 h-[80vh] overflow-y-scroll scrollbar-thin">
      <h5 className="text-[25px] font-[600] text-gray-800 text-center font-Poppins border-b pb-3 mb-6">
        Create Product
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter product name..."
            className={`${styles.input} !h-[40px]`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 pb-1">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            cols="30"
            rows="5"
            placeholder="Enter product description..."
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
            Upload Product Images <span className="text-red-500">*</span>
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
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
