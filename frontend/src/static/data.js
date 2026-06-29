import React from "react";

// navigation Data
export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

// branding data
export const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "From all orders over 100$",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1h6l3.6 18h18L32 6H8.2"
          stroke="#ffbb38"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="30" r="3" fill="#ffbb38" />
        <circle cx="28" cy="30" r="3" fill="#ffbb38" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Daily Surprise Offers",
    Description: "Save up to 25% off",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 1.333A14.667 14.667 0 1030.667 16 14.667 14.667 0 0016 1.333zm1.333 22h-2.666V20.7h2.666V23.33zm0-5.333h-2.666a5.333 5.333 0 010-10.667h1.333A4 4 0 0118.7 12a4 4 0 01-1.367 3.033l-1.3 1.134v1.833z"
          fill="#ffbb38"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Affordable Prices",
    Description: "Get Factory Direct Price",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 8.667H4A2.667 2.667 0 001.333 11.33v9.334A2.667 2.667 0 004 23.333h24a2.667 2.667 0 002.667-2.666V11.33A2.667 2.667 0 0028 8.667zM16 19.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666z"
          fill="#ffbb38"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Secure Payments",
    Description: "100% Protected Payments",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 1.333L4 6.667v8c0 7.4 5.107 14.32 12 16 6.893-1.68 12-8.6 12-16v-8L16 1.333zm-1.333 17.334l-4-4 1.88-1.88 2.12 2.12 6.12-6.12 1.88 1.88-8 8z"
          fill="#ffbb38"
        />
      </svg>
    ),
  },
];

// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: "",
    image_Url:
      "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacBookPro13-inch_2021_M1_8GBRAM_256GBSSD_SpaceGray_1.jpg?v=1622591906",
  },
  {
    id: 2,
    title: "Cosmetics and Body Care",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29zbWV0aWNzfGVufDB8fDB8fHww&w=1000&q=80",
  },
  {
    id: 3,
    title: "Accessories",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 4,
    title: "Cloths",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 5,
    title: "Shoes",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 6,
    title: "Gifts",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lmdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 7,
    title: "Pet Care",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0JTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  },
  {
    id: 8,
    title: "Mobile and Tablets",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 9,
    title: "Music and Gaming",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nfGVufDB8fDB8fHww&w=1000&q=80",
  },
  {
    id: 10,
    title: "Others",
    subTitle: "",
    image_Url:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  },
];

// footer links
export const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/careers",
  },
  {
    name: "Store Locations",
    link: "/locations",
  },
  {
    name: "Our Blog",
    link: "/blog",
  },
  {
    name: "Reviews",
    link: "/reviews",
  },
];

export const footercompanyLinks = [
  {
    name: "Game & Toy",
    link: "/products?category=Music-and-Gaming",
  },
  {
    name: "Beauty & Care",
    link: "/products?category=Cosmetics-and-Body-Care",
  },
  {
    name: "Laptops & PC",
    link: "/products?category=Computers-and-Laptops",
  },
  {
    name: "Mobile & Accessories",
    link: "/products?category=Mobile-and-Tablets",
  },
  {
    name: "Shoes & Boots",
    link: "/products?category=Shoes",
  },
];

export const footerSupportLinks = [
  {
    name: "FAQ",
    link: "/faq",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
  {
    name: "Shipping Policy",
    link: "/shipping-policy",
  },
  {
    name: "Return & Refund Policy",
    link: "/return-policy",
  },
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
];
