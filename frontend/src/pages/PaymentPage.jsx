import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Payment from "../components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div>
      <Header />
      <CheckoutSteps active={2} />
      <Payment />
      <Footer />
    </div>
  );
};

export default PaymentPage;
