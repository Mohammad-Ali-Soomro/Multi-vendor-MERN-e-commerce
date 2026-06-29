import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

import Navbar from "./Navbar";
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
      {/* Floating Navbar */}
      <header className={`navbar-floating ${active ? 'scrolled' : ''}`}>
        <div className="flex items-center justify-between px-6 py-3">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {/* 4 bars icon like wisprflow logo */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="14" width="4" height="12" rx="2" fill="#0D1F1A"/>
                <rect x="8" y="8" width="4" height="18" rx="2" fill="#0D1F1A"/>
                <rect x="14" y="4" width="4" height="22" rx="2" fill="#0D1F1A"/>
                <rect x="20" y="10" width="4" height="16" rx="2" fill="#0D1F1A"/>
              </svg>
              <span className="font-editorial font-bold text-xl text-dark tracking-tight">
                ShopVerse
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden 800px:flex items-center gap-1">
            <Navbar active={activeHeading} />
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Search - desktop */}
            <div className="hidden 800px:block relative">
              <div className="relative">
                <AiOutlineSearch 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-9 pr-4 py-2 text-sm bg-cream-dark border-0 rounded-full w-[200px] focus:w-[280px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lavender/50 font-sans"
                />
                {/* Search results dropdown */}
                {searchData && searchData.length !== 0 && (
                  <div className="absolute top-full mt-2 left-0 w-[320px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 z-50">
                    {searchData.map((i, index) => (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-cream transition-colors">
                          <img
                            src={i.images[0]?.url}
                            alt={i.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-dark line-clamp-1">{i.name}</p>
                            <p className="text-xs text-text-muted">${i.discountPrice}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist */}
            <button
              className="relative p-2 rounded-full hover:bg-cream-dark transition-colors hidden 800px:flex"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={22} className="text-dark" />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-lavender rounded-full text-[10px] font-bold text-dark flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="relative p-2 rounded-full hover:bg-cream-dark transition-colors hidden 800px:flex"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={22} className="text-dark" />
              {cart && cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-lavender rounded-full text-[10px] font-bold text-dark flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="hidden 800px:block">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.avatar?.url}
                    className="w-9 h-9 rounded-full object-cover border-2 border-lavender/50"
                    alt="profile"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <button className="btn-outline-dark text-sm py-2 px-5">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* Seller CTA */}
            <Link to={isSeller ? "/dashboard" : "/shop-create"} className="hidden 800px:block">
              <button className="btn-lavender text-sm py-2.5 px-5">
                {isSeller ? "Dashboard" : "Start Selling"}
              </button>
            </Link>

            {/* Mobile hamburger */}
            <button 
              className="800px:hidden p-2 rounded-full hover:bg-cream-dark transition-colors"
              onClick={() => setOpen(true)}
            >
              <BiMenuAltLeft size={24} className="text-dark" />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed nav */}
      <div className="h-[80px]" />

      {/* Mobile cart/wishlist popups - keep existing Cart and Wishlist components */}
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
      {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 bg-dark/50 z-50 800px:hidden" onClick={() => setOpen(false)}>
          <div 
            className="absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-cream overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="font-editorial font-bold text-xl text-dark">Menu</span>
                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-cream-dark">
                  <RxCross1 size={20} className="text-dark" />
                </button>
              </div>

              {/* Mobile search */}
              <div className="relative mb-6">
                <AiOutlineSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-3 bg-white rounded-2xl border border-gray-100 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-lavender/50"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <Navbar active={activeHeading} />

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => { setOpenWishlist(true); setOpen(false); }}
                  >
                    <AiOutlineHeart size={20} className="text-dark" />
                    <span className="font-sans text-sm font-medium">Wishlist ({wishlist?.length || 0})</span>
                  </button>
                </div>

                <Link to={isSeller ? "/dashboard" : "/shop-create"}>
                  <button className="btn-lavender w-full justify-center mt-4">
                    {isSeller ? "Go to Dashboard" : "Start Selling"}
                  </button>
                </Link>

                {isAuthenticated ? (
                  <Link to="/profile">
                    <div className="flex items-center gap-3 mt-4 p-3 bg-white rounded-2xl">
                      <img src={user?.avatar?.url} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <p className="font-medium text-sm text-dark">{user?.name}</p>
                        <p className="text-xs text-text-muted">View Profile</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex gap-2 mt-4">
                    <Link to="/login" className="flex-1">
                      <button className="btn-outline-dark w-full justify-center text-sm">Sign In</button>
                    </Link>
                    <Link to="/sign-up" className="flex-1">
                      <button className="btn-dark w-full justify-center text-sm">Sign Up</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
