import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Events/Events";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <div className="reveal">
        <Categories />
      </div>
      <div className="reveal">
        <BestDeals />
      </div>
      <div className="reveal">
        <Events />
      </div>
      <div className="reveal">
        <FeaturedProduct />
      </div>
      <div className="reveal">
        <Sponsored />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
