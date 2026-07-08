import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

import { server } from "../../server";

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state) => state.user);

  const [orderData, setOrderData] = useState(null);
  const [select, setSelect] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("latestOrder"));
    if (data) {
      setOrderData(data);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user,
    totalPrice: orderData?.totalPrice,
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      order.paymentInfo = {
        id: paymentInfo.payer.payer_id,
        status: "succeeded",
        type: "Paypal",
      };

      await axios.post(`${server}/order/create-order`, order, config);
      setOpen(false);
      localStorage.removeItem("cartItems");
      localStorage.removeItem("latestOrder");
      toast.success("Order created successfully!");
      navigate("/order/success");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Order submission failed!");
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const paymentData = {
        amount: Math.round(orderData.totalPrice * 100),
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const client_secret = data.client_secret;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          };

          await axios.post(`${server}/order/create-order`, order, config);
          localStorage.removeItem("cartItems");
          localStorage.removeItem("latestOrder");
          toast.success("Order created successfully!");
          navigate("/order/success");
          window.location.reload();
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment confirmation failed!");
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    try {
      order.paymentInfo = {
        type: "Cash On Delivery",
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      await axios.post(`${server}/order/create-order`, order, config);
      localStorage.removeItem("cartItems");
      localStorage.removeItem("latestOrder");
      toast.success("Order created successfully!");
      navigate("/order/success");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Order submission failed!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex gap-4">
        {/* Left Side: Choose payment method */}
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            select={select}
            setSelect={setSelect}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            open={open}
            setOpen={setOpen}
            orderData={orderData}
            paypalPaymentHandler={paypalPaymentHandler}
          />
        </div>

        {/* Right Side: Totals */}
        <div className="w-full 800px:w-[35%] mt-8 800px:mt-0">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  select,
  setSelect,
  paymentHandler,
  cashOnDeliveryHandler,
  open,
  setOpen,
  orderData,
  paypalPaymentHandler,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 shadow-sm space-y-6">
      {/* 1. Debit/Credit Card */}
      <div>
        <div
          className="flex items-center cursor-pointer border-b pb-4"
          onClick={() => setSelect(1)}
        >
          <div className="w-[18px] h-[18px] rounded-full border border-gray-400 flex items-center justify-center mr-3">
            {select === 1 && <div className="w-[10px] h-[10px] bg-red-500 rounded-full" />}
          </div>
          <h4 className="text-[16px] font-[600] text-gray-800">
            Pay with Debit/Credit Card
          </h4>
        </div>
        {select === 1 && (
          <form className="mt-4 space-y-4 max-w-[500px]" onSubmit={paymentHandler}>
            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  readOnly
                  value={user?.name || ""}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none sm:text-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Card Expiry
                </label>
                <CardExpiryElement
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  options={{
                    style: {
                      base: { fontSize: "14px", color: "#333" },
                    },
                  }}
                />
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  Card Number
                </label>
                <CardNumberElement
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  options={{
                    style: {
                      base: { fontSize: "14px", color: "#333" },
                    },
                  }}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 pb-1">
                  CVC Code
                </label>
                <CardCvcElement
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  options={{
                    style: {
                      base: { fontSize: "14px", color: "#333" },
                    },
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-[600]"
            >
              Submit Card Payment
            </button>
          </form>
        )}
      </div>

      {/* 2. Pay with PayPal */}
      <div>
        <div
          className="flex items-center cursor-pointer border-b pb-4"
          onClick={() => setSelect(2)}
        >
          <div className="w-[18px] h-[18px] rounded-full border border-gray-400 flex items-center justify-center mr-3">
            {select === 2 && <div className="w-[10px] h-[10px] bg-red-500 rounded-full" />}
          </div>
          <h4 className="text-[16px] font-[600] text-gray-800">Pay with PayPal</h4>
        </div>
        {select === 2 && (
          <div className="mt-4">
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 text-sm font-[600]"
            >
              Pay Now with PayPal
            </button>

            {open && (
              <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center">
                <div className="w-[90%] 800px:w-[40%] bg-white rounded-md p-6 shadow-md relative">
                  <RxCross1
                    size={25}
                    className="absolute right-4 top-4 cursor-pointer text-gray-600"
                    onClick={() => setOpen(false)}
                  />
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-6">
                    PayPal Payment Options
                  </h4>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AbVvB3k11H1v8q_68zO9mGqg2n5T9_hI1g79-R3zN8O4O1q8q-R3zN8O4O1q8q",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              description: "Sunflower",
                              amount: {
                                currency_code: "USD",
                                value: orderData?.totalPrice,
                              },
                            },
                          ],
                          application_context: {
                            shipping_preference: "NO_SHIPPING",
                          },
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          paypalPaymentHandler(details);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Cash on Delivery */}
      <div>
        <div
          className="flex items-center cursor-pointer border-b pb-4"
          onClick={() => setSelect(3)}
        >
          <div className="w-[18px] h-[18px] rounded-full border border-gray-400 flex items-center justify-center mr-3">
            {select === 3 && <div className="w-[10px] h-[10px] bg-red-500 rounded-full" />}
          </div>
          <h4 className="text-[16px] font-[600] text-gray-800 font-[Poppins]">
            Cash on Delivery
          </h4>
        </div>
        {select === 3 && (
          <form className="mt-4" onSubmit={cashOnDeliveryHandler}>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-[600]"
            >
              Confirm Cash On Delivery
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const subTotalPrice = orderData?.subTotalPrice || 0;
  const shipping = orderData?.shipping || 0;
  const discountPrice = orderData?.discountPrice || 0;
  const totalPrice = orderData?.totalPrice || 0;

  return (
    <div className="w-full bg-white rounded-md p-5 shadow-sm space-y-4 border">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
        Order Summary
      </h3>
      <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
        <span>Subtotal:</span>
        <span className="font-semibold">${subTotalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
        <span>Shipping:</span>
        <span className="font-semibold">${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
        <span>Discount:</span>
        <span className="font-semibold">-${discountPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg text-gray-800 font-bold border-b pb-2">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
};

export default Payment;
