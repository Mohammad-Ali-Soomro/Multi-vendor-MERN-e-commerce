import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 py-10 space-y-4">
        <h2 className="text-3xl font-extrabold text-gray-800 font-Poppins">404 - Page Not Found</h2>
        <p className="text-gray-500 text-sm">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-sm transition shadow"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
