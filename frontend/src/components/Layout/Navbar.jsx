import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  const navItems = [
    { title: "Home", url: "/" },
    { title: "Best Selling", url: "/best-selling" },
    { title: "Products", url: "/products" },
    { title: "Events", url: "/events" },
    { title: "FAQ", url: "/faq" },
  ];

  return (
    <div className="flex flex-col 800px:flex-row items-start 800px:items-center gap-1">
      {navItems.map((i, index) => (
        <Link
          key={index}
          to={i.url}
          className={`
            px-4 py-2 rounded-full text-[14px] font-medium font-sans transition-all duration-200
            ${active === index + 1 
              ? "bg-dark text-cream" 
              : "text-text-muted hover:text-dark hover:bg-cream-dark"
            }
          `}
        >
          {i.title}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
