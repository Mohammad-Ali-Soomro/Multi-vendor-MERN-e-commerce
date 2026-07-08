import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import Events from "../components/Events/Events";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import RevealSection from "../components/Layout/RevealSection";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <RevealSection>
        <Categories />
      </RevealSection>
      <RevealSection>
        <BestDeals />
      </RevealSection>
      <RevealSection>
        <Events />
      </RevealSection>
      <RevealSection>
        <FeaturedProduct />
      </RevealSection>
      <RevealSection>
        <Sponsored />
      </RevealSection>
      <Footer />
    </div>
  );
};

export default HomePage;
