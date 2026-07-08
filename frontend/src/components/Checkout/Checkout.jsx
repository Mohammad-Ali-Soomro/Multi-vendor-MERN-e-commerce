import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";

import { server } from "../../server";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * (item.discountPrice || item.originalPrice),
    0
  );

  const shipping = subTotalPrice * 0.1;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPrice).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code!");
      return;
    }
    try {
      const { data } = await axios.get(
        `${server}/coupon/get-coupon-value/${couponCode}`
      );
      const coupon = data.couponCode;

      if (!coupon) {
        toast.error("Coupon code invalid!");
        return;
      }

      const isShopIdMatch = cart && cart.some((item) => item.shopId === coupon.shopId);
      if (!isShopIdMatch) {
        toast.error("Coupon not valid for items in your cart!");
        return;
      }

      let discountAmount = 0;
      if (coupon.value) {
        discountAmount = (subTotalPrice * coupon.value) / 100;
      }

      setDiscountPrice(discountAmount);
      setCouponCodeData(coupon);
      setCouponCode("");
      toast.success("Coupon code applied successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid coupon code!");
    }
  };

  const paymentSubmit = () => {
    if (!country || !city || !address1 || !zipCode) {
      toast.error("Please fill all required shipping fields!");
      return;
    }

    const shippingAddress = {
      country,
      city,
      address1,
      address2,
      zipCode,
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex gap-4">
        {/* Left Side: Shipping Info */}
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>

        {/* Right Side: Order Summary & Coupon */}
        <div className="w-full 800px:w-[35%] mt-8 800px:mt-0">
          <CartData
            subTotalPrice={subTotalPrice}
            shipping={shipping}
            discountPrice={discountPrice}
            totalPrice={totalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            handleCouponSubmit={handleCouponSubmit}
            paymentSubmit={paymentSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const [savedAddress, setSavedAddress] = useState(false);

  return (
    <div className="w-full bg-white rounded-md p-5 pb-8 shadow-sm">
      <h5 className="text-[18px] font-[500] text-gray-800 border-b pb-2 mb-4">
        Shipping Address
      </h5>
      <form className="space-y-4">
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              readOnly
              value={user?.name || ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              readOnly
              value={user?.email || ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              readOnly
              value={user?.phoneNumber || ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none sm:text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Choose your country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">City / State</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Choose your city</option>
              {country &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Address 1</label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Address 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>

      {/* Saved Addresses Selector */}
      <div className="mt-6 border-t pt-4">
        <h5
          className="text-blue-600 font-semibold cursor-pointer text-sm"
          onClick={() => setSavedAddress(!savedAddress)}
        >
          Choose From Saved Address
        </h5>
        {savedAddress && user?.addresses && (
          <div className="mt-3 space-y-2">
            {user.addresses.map((item, index) => (
              <div className="flex items-start" key={index}>
                <input
                  type="checkbox"
                  id={`address-${index}`}
                  className="mt-1 mr-2"
                  onChange={() => {
                    setCountry(item.country);
                    setCity(item.city);
                    setAddress1(item.address1);
                    setAddress2(item.address2);
                    setZipCode(item.zipCode);
                  }}
                />
                <label
                  htmlFor={`address-${index}`}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  <span className="font-semibold">{item.addressType}:</span>{" "}
                  {item.address1}, {item.city}, {item.country}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CartData = ({
  subTotalPrice,
  shipping,
  discountPrice,
  totalPrice,
  couponCode,
  setCouponCode,
  handleCouponSubmit,
  paymentSubmit,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-5 shadow-sm space-y-4">
      {/* Pricing breakdowns */}
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

      {/* Coupon input */}
      <form onSubmit={handleCouponSubmit} className="flex gap-2 pt-2">
        <input
          type="text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Apply
        </button>
      </form>

      {/* Payment Submit Button */}
      <div className="pt-4">
        <button
          onClick={paymentSubmit}
          className="w-full h-[45px] bg-[#f63b60] text-white font-[600] rounded-md hover:bg-[#e43354] transition"
        >
          Go to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
