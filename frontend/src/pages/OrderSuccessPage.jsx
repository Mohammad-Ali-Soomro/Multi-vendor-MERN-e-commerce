import React from "react";
import Lottie from "react-lottie";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import animationData from "../Assests/animations/Success checkmark.json";

const OrderSuccessPage = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Header />
      <Success defaultOptions={defaultOptions} />
      <Footer />
    </div>
  );
};

const Success = ({ defaultOptions }) => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 py-10">
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center text-[25px] font-[600] text-gray-800 mt-5">
        Your order is successful 😍
      </h5>
    </div>
  );
};

export default OrderSuccessPage;
