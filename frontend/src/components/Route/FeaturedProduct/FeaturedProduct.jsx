import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <section className="section-spacing bg-cream">
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="font-sans text-sm text-text-muted tracking-widest uppercase font-medium block mb-3">
              Curated Collection
            </span>
            <h2 className="font-editorial text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark leading-tight">
              Featured<br />
              <span className="italic text-text-muted">products</span>
            </h2>
          </div>
          <Link to="/products" className="btn-outline-dark text-sm py-2.5 px-6 hidden 800px:inline-flex">
            Browse All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {allProducts && allProducts.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
