import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar, AiOutlineStar, AiOutlineMessage } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import styles from "../styles/styles";
import Loader from "./Layout/Loader";

const UserOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orders, isLoading } = useSelector((state) => state.order);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const order = orders && orders.find((item) => item._id === id);

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    if (rating <= 1) {
      toast.error("Please provide a rating greater than 1 star!");
      return;
    }
    try {
      await axios.put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      );
      toast.success("Review submitted successfully!");
      setOpen(false);
      setComment("");
      setRating(1);
      if (user?._id) {
        dispatch(getAllOrdersOfUser(user._id));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review!");
    }
  };

  const refundHandler = async () => {
    try {
      await axios.put(
        `${server}/order/order-refund/${id}`,
        {
          status: "Processing refund",
        },
        { withCredentials: true }
      );
      toast.success("Refund request submitted successfully!");
      if (user?._id) {
        dispatch(getAllOrdersOfUser(user._id));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Refund request failed!");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`${styles.section} py-8 min-h-screen`}>
      {order ? (
        <div className="bg-white rounded-lg shadow-sm p-6 border space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Order Invoice Details</h2>
              <p className="text-xs text-gray-400 mt-1">Placed on: {order.createdAt?.slice(0, 10)}</p>
            </div>
            <Link to="/" className="flex items-center text-blue-600 font-semibold hover:underline">
              <AiOutlineMessage size={20} className="mr-1" /> Send Message
            </Link>
          </div>

          {/* Cart items list */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-800">Order Items</h3>
            {order.cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <img
                    src={item.images && item.images[0]?.url}
                    alt={item.name}
                    className="w-[80px] h-[80px] object-contain rounded border"
                  />
                  <div className="pl-4">
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      ${item.discountPrice || item.originalPrice} x {item.qty}
                    </p>
                  </div>
                </div>

                {/* Review Trigger Button */}
                {!item.isReviewed && order.status === "Delivered" && (
                  <button
                    onClick={() => {
                      setOpen(true);
                      setSelectedItem(item);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition"
                  >
                    Write a review
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            {/* Shipping details */}
            <div className="bg-gray-50 rounded-md p-4 space-y-2">
              <h4 className="font-bold text-gray-800 mb-2">Shipping Address</h4>
              <p className="text-sm text-gray-600">
                Name: <span className="font-semibold">{order.user?.name}</span>
              </p>
              <p className="text-sm text-gray-600">
                Country: <span className="font-semibold">{order.shippingAddress?.country}</span>
              </p>
              <p className="text-sm text-gray-600">
                City: <span className="font-semibold">{order.shippingAddress?.city}</span>
              </p>
              <p className="text-sm text-gray-600">
                Address 1: <span className="font-semibold">{order.shippingAddress?.address1}</span>
              </p>
              <p className="text-sm text-gray-600">
                Address 2: <span className="font-semibold">{order.shippingAddress?.address2 || "N/A"}</span>
              </p>
              <p className="text-sm text-gray-600">
                Zip Code: <span className="font-semibold">{order.shippingAddress?.zipCode}</span>
              </p>
            </div>

            {/* Payment & Order Status */}
            <div className="bg-gray-50 rounded-md p-4 space-y-2">
              <h4 className="font-bold text-gray-800 mb-2">Order Information</h4>
              <p className="text-sm text-gray-600">
                Payment Type:{" "}
                <span className="font-semibold">{order.paymentInfo?.type || "Cash On Delivery"}</span>
              </p>
              <p className="text-sm text-gray-600">
                Payment Status:{" "}
                <span className="font-semibold capitalize">
                  {order.paymentInfo?.status || "Pending"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Order Status:{" "}
                <span className="font-semibold text-blue-600">{order.status}</span>
              </p>
              <p className="text-lg font-bold text-gray-800 border-t pt-2 mt-2">
                Total Price: ${order.totalPrice}
              </p>

              {/* Refund action button */}
              {order.status === "Delivered" && (
                <button
                  onClick={refundHandler}
                  className="mt-4 px-4 py-2 border border-red-500 text-red-500 rounded-md font-semibold hover:bg-red-500 hover:text-white transition w-full md:w-auto"
                >
                  Give a Refund
                </button>
              )}
            </div>
          </div>

          {/* Floating review creation modal overlay */}
          {open && selectedItem && (
            <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] bg-white rounded-md p-6 shadow-md relative">
                <RxCross1
                  size={25}
                  className="absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-black"
                  onClick={() => setOpen(false)}
                />
                <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Write a Product Review
                </h4>

                <div className="flex items-center space-x-3 mb-6">
                  <img
                    src={selectedItem.images && selectedItem.images[0]?.url}
                    alt=""
                    className="w-[60px] h-[60px] object-contain rounded border"
                  />
                  <div>
                    <h5 className="font-semibold text-sm text-gray-800">{selectedItem.name}</h5>
                    <p className="text-xs text-gray-500">${selectedItem.discountPrice || selectedItem.originalPrice}</p>
                  </div>
                </div>

                <form onSubmit={reviewSubmitHandler} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 pb-1">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((i) =>
                        i <= rating ? (
                          <AiFillStar
                            key={i}
                            size={25}
                            color="#f6b100"
                            className="cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            size={25}
                            color="#f6b100"
                            className="cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 pb-1">Comment</label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your product experience..."
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-[100px] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-[40px] bg-blue-600 text-white rounded-[3px] font-[500] hover:bg-blue-700 transition"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h5 className="text-center py-20 text-gray-600 text-[18px]">Order not found!</h5>
      )}
    </div>
  );
};

export default UserOrderDetails;
