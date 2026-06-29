import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import styles from "../../styles/styles";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  const order = orders && orders.find((item) => item._id === id);

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const updateStatusHandler = async () => {
    try {
      const endpoint =
        status === "Refund Success"
          ? `${server}/order/order-refund-success/${id}`
          : `${server}/order/update-order-status/${id}`;

      await axios.put(
        endpoint,
        { status },
        { withCredentials: true }
      );
      toast.success("Order status updated successfully!");
      if (seller?._id) {
        dispatch(getAllOrdersOfShop(seller._id));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed!");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const standardStatuses = [
    "Processing",
    "Transferred to delivery partner",
    "Shipping",
    "Received",
    "On the way",
    "Delivered",
  ];

  const refundStatuses = ["Processing refund", "Refund Success"];

  const isRefundRelated = refundStatuses.includes(order?.status);

  const visibleStatuses = isRefundRelated
    ? refundStatuses.slice(refundStatuses.indexOf(order?.status))
    : standardStatuses.indexOf(order?.status) !== -1
    ? standardStatuses.slice(standardStatuses.indexOf(order?.status))
    : [order?.status];

  return (
    <div className="w-full p-4 sm:p-8 min-h-screen bg-gray-50">
      {order ? (
        <div className="bg-white rounded-lg shadow-sm p-6 border space-y-6 max-w-[900px] mx-auto">
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Shop Order Invoice</h2>
            <p className="text-xs text-gray-400 mt-1">Placed on: {order.createdAt?.slice(0, 10)}</p>
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
                    className="w-[85px] h-[85px] object-contain rounded border"
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
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            {/* Shipping details */}
            <div className="bg-gray-50 rounded-md p-4 space-y-2">
              <h4 className="font-bold text-gray-800 mb-2">Shipping Details</h4>
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
              <h4 className="font-bold text-gray-800 mb-2">Order Info</h4>
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
                Current Status:{" "}
                <span className="font-semibold text-blue-600">{order.status}</span>
              </p>
              <p className="text-lg font-bold text-gray-800 border-t pt-2 mt-2">
                Total Price: ${order.totalPrice}
              </p>

              {/* Status Update Dropdown */}
              <div className="pt-4 space-y-3">
                <label className="block text-sm font-semibold text-gray-700">Update Order Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                >
                  {visibleStatuses.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  onClick={updateStatusHandler}
                  className="w-full h-[40px] bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h5 className="text-center py-20 text-gray-600 text-[18px]">Order not found!</h5>
      )}
    </div>
  );
};

export default OrderDetails;
