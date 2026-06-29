import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

import {
  footerProductLinks,
  footercompanyLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      {/* Subscribe section */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d8e4]">Subscribe</span> us for news, <br />
          events and offers
        </h1>
        <div className="flex w-full md:w-auto items-center">
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 w-full sm:mr-5 mr-1 lg:w-96 md:w-72 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56bb8a] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full font-[500]">
            Submit
          </button>
        </div>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        {/* Brand column */}
        <ul className="px-5 text-center sm:text-start flex flex-col items-center sm:items-start">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="logo"
            style={{ filter: "brightness(0) invert(1)" }}
            className="h-[40px]"
          />
          <br />
          <p className="text-gray-400 text-sm">
            The home and the elements needed to create beautiful products.
          </p>
          <div className="flex items-center gap-[15px] mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer text-[#fff] hover:text-[#342ac8] transition duration-200" />
            <AiOutlineTwitter size={25} className="cursor-pointer text-[#fff] hover:text-[#56d8e4] transition duration-200" />
            <AiFillInstagram size={25} className="cursor-pointer text-[#fff] hover:text-[#e4405f] transition duration-200" />
            <AiFillYoutube size={25} className="cursor-pointer text-[#fff] hover:text-[#cd201f] transition duration-200" />
          </div>
        </ul>

        {/* Company links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-lg">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm leading-6 cursor-pointer"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Shop links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-lg">Shop</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm leading-6 cursor-pointer"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Support links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold text-lg">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm leading-6 cursor-pointer"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom copyright */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8 border-t border-gray-800 px-5">
        <span>© 2026 Becodemy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="flex items-center justify-center">
          <img
            src="https://resources.blog.b95.ca/wp-content/uploads/2016/09/payment-methods.png"
            alt="payments"
            className="h-[30px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
