import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import Loader from "../Layout/Loader";

const TrackOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orders, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const order = orders && orders.find((item) => item._id === id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-4">
      {order ? (
        <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-[500px] border">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
            Track Order Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Order ID:</span>
              <span className="text-gray-800 font-[500]">{order._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Total Price:</span>
              <span className="text-gray-800 font-semibold">${order.totalPrice}</span>
            </div>
            <div className="border-t pt-4 mt-4 flex flex-col items-center">
              <span className="text-sm text-gray-500 font-medium mb-2">Order Status:</span>
              {order.status === "Processing" && (
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold text-base">
                  Your Order is being processed in shop!
                </span>
              )}
              {order.status === "Transferred" && (
                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold text-base">
                  Your Order is transferred to delivery partner!
                </span>
              )}
              {order.status === "Shipping" && (
                <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-semibold text-base">
                  Your Order is on the shipping pipeline!
                </span>
              )}
              {order.status === "Received" && (
                <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-semibold text-base">
                  Your Order is received in your city!
                </span>
              )}
              {order.status === "On the way" && (
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-base">
                  Your Order is out for delivery!
                </span>
              )}
              {order.status === "Delivered" && (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-base">
                  Your Order is delivered successfully!
                </span>
              )}
              {order.status === "Processing refund" && (
                <span className="px-4 py-2 bg-rose-100 text-rose-800 rounded-full font-semibold text-base">
                  Refund request is processing!
                </span>
              )}
              {order.status === "Refund Success" && (
                <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-semibold text-base">
                  Refund has been credited successfully!
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h5 className="text-[18px] text-gray-600 font-[500]">Order not found!</h5>
      )}
    </div>
  );
};

export default TrackOrder;
