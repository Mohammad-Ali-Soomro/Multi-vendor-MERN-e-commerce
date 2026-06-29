import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

import { categoriesData } from "../../static/data";
import styles from "../../styles/styles";
import Navbar from "./Navbar";
import DropDown from "./DropDown";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchData(null);
    } else {
      const filtered =
        allProducts &&
        allProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      setSearchData(filtered);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${styles.section}`}>
        {/* Top Header */}
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>
          {/* Search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer text-gray-500"
            />
            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-full left-0 top-[45px] rounded-md border border-gray-200">
                {searchData.map((i, index) => (
                  <Link to={`/product/${i._id}`} key={index}>
                    <div className="w-full flex items-center py-2 hover:bg-gray-100 px-2 rounded-md">
                      <img
                        src={i.images[0]?.url}
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px] object-cover rounded"
                      />
                      <h1 className="text-gray-800 font-[500]">{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seller / Dashboard Button */}
          <div className={`${styles.button}`}>
            <Link to={isSeller ? "/dashboard" : "/shop-create"}>
              <h1 className="text-[#fff] flex items-center font-[500]">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className={`${styles.section} ${styles.noramlFlex} justify-between`}>
          {/* Categories Dropdown */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-4 left-2" />
              <button className="h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          {/* Nav Items */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* User Icons */}
          <div className="flex items-center">
            {/* Wishlist */}
            <div
              className={`${styles.noramlFlex} relative cursor-pointer mr-[15px]`}
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} className="text-white" />
              <span className="absolute right-[-5px] top-[-5px] rounded-full bg-[#3bc173] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center flex items-center justify-center">
                {wishlist ? wishlist.length : 0}
              </span>
            </div>

            {/* Cart */}
            <div
              className={`${styles.noramlFlex} relative cursor-pointer mr-[15px]`}
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="text-white" />
              <span className="absolute right-[-5px] top-[-5px] rounded-full bg-[#3bc173] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center flex items-center justify-center">
                {cart ? cart.length : 0}
              </span>
            </div>

            {/* Profile avatar / login */}
            <div className={`${styles.noramlFlex} relative cursor-pointer`}>
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
                    className="w-[35px] h-[35px] rounded-full object-cover border border-white"
                    alt="avatar"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} className="text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 flex items-center justify-between 800px:hidden border-b border-gray-200 px-4`}
      >
        <div>
          <BiMenuAltLeft
            size={40}
            className="cursor-pointer text-gray-700"
            onClick={() => setOpen(true)}
          />
        </div>
        <div>
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
              className="h-[35px]"
            />
          </Link>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => setOpenCart(true)}
        >
          <AiOutlineShoppingCart size={35} className="text-gray-700" />
          <span className="absolute right-[-5px] top-[-5px] rounded-full bg-[#3bc173] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center flex items-center justify-center">
            {cart ? cart.length : 0}
          </span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed w-full h-full bg-[#00000030] z-50 top-0 left-0 flex">
          <div className="w-[70%] bg-white h-screen overflow-y-scroll relative flex flex-col p-5 shadow-2xl animate-fade-in duration-300">
            <div className="flex justify-between items-center pb-4 border-b">
              <div
                className="relative cursor-pointer"
                onClick={() => setOpenWishlist(true) || setOpen(false)}
              >
                <AiOutlineHeart size={30} className="text-gray-700" />
                <span className="absolute right-[-5px] top-[-5px] rounded-full bg-[#3bc173] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center flex items-center justify-center">
                  {wishlist ? wishlist.length : 0}
                </span>
              </div>
              <RxCross1
                size={30}
                className="cursor-pointer text-gray-700 hover:text-black"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Mobile Search */}
            <div className="my-5 w-full relative">
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />
              {searchData && searchData.length !== 0 && (
                <div className="absolute bg-slate-50 shadow-sm-2 z-[9] p-3 w-full left-0 top-[45px] rounded-md border border-gray-200">
                  {searchData.map((i, index) => (
                    <Link to={`/product/${i._id}`} key={index} onClick={() => setOpen(false)}>
                      <div className="w-full flex items-center py-2 hover:bg-gray-100 px-2 rounded-md">
                        <img
                          src={i.images[0]?.url}
                          alt=""
                          className="w-[30px] h-[30px] mr-[10px] object-cover rounded"
                        />
                        <h1 className="text-gray-800 text-[14px] font-[500]">{i.name}</h1>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="my-5">
              <Navbar active={activeHeading} />
            </div>

            {/* Mobile Become Seller Button */}
            <div className={`${styles.button} !rounded-[4px]`}>
              <Link to={isSeller ? "/dashboard" : "/shop-create"}>
                <h1 className="text-[#fff] flex items-center font-[500]">
                  {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>

            {/* Mobile Profile / Auth */}
            <div className="mt-8 border-t pt-5">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <img
                      src={user?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
                      className="w-[45px] h-[45px] rounded-full border-[2px] border-[#3957db] object-cover"
                      alt="avatar"
                    />
                  </Link>
                  <h4 className="pl-3 text-[18px] font-[500] text-gray-800">{user.name}</h4>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-[18px] text-[#333] font-[500] hover:text-[#3957db]"
                    onClick={() => setOpen(false)}
                  >
                    Login /
                  </Link>
                  <Link
                    to="/sign-up"
                    className="text-[18px] text-[#333] font-[500] hover:text-[#3957db]"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Render Cart overlay */}
      {openCart && <Cart setOpenCart={setOpenCart} />}

      {/* Render Wishlist overlay */}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
