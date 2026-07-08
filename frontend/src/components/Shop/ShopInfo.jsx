import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import Loader from "../Layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/shop/logout`, { withCredentials: true });
      toast.success("Merchant logged out successfully!");
      navigate("/shop-login");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed!");
    }
  };

  // Calculate stats from products reviews
  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + (product.reviews ? product.reviews.length : 0), 0);

  const totalRatingsSum =
    products &&
    products.reduce(
      (acc, product) =>
        acc +
        (product.reviews
          ? product.reviews.reduce((sum, item) => sum + item.rating, 0)
          : 0),
      0
    );

  const averageRating =
    totalReviewsLength > 0 ? (totalRatingsSum / totalReviewsLength).toFixed(1) : "0.0";

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full bg-white shadow-sm border rounded-[5px] p-5 space-y-6">
      {/* Avatar & Name */}
      <div className="flex flex-col items-center border-b pb-4">
        <img
          src={data?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
          alt=""
          className="w-[120px] h-[120px] rounded-full object-cover border"
        />
        <h4 className="text-[20px] font-[600] text-gray-800 mt-3 text-center">{data?.name}</h4>
        <p className="text-gray-500 text-sm text-center mt-2 leading-relaxed">
          {data?.description || "No description provided."}
        </p>
      </div>

      {/* Address & Contacts */}
      <div className="space-y-3 text-sm text-gray-600">
        <div>
          <h5 className="font-semibold text-gray-800">Address</h5>
          <p className="mt-1">{data?.address || "N/A"}</p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">Phone Number</h5>
          <p className="mt-1">{data?.phoneNumber || "N/A"}</p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">Total Products</h5>
          <p className="mt-1">{products ? products.length : 0}</p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">Shop Ratings</h5>
          <p className="mt-1">{averageRating}/5</p>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">Joined On</h5>
          <p className="mt-1">{data?.createdAt ? data.createdAt.slice(0, 10) : "N/A"}</p>
        </div>
      </div>

      {/* Owner controls */}
      {isOwner && (
        <div className="space-y-3 pt-4 border-t">
          <Link to="/settings">
            <div className="w-full h-[40px] border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition rounded-[4px] flex items-center justify-center cursor-pointer text-sm">
              Edit Shop
            </div>
          </Link>
          <div
            onClick={logoutHandler}
            className="w-full h-[40px] bg-red-500 text-white font-semibold hover:bg-red-600 transition rounded-[4px] flex items-center justify-center cursor-pointer text-sm"
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
