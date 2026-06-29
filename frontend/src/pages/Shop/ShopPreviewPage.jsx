import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const ShopPreviewPage = () => {
  return (
    <div>
      <Header />
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-gray-50 py-10">
        <h5 className="text-gray-500 font-semibold text-lg">Shop Preview listings page</h5>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPreviewPage;
