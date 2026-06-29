import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts) {
      const sortedData = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = sortedData.slice(0, 5);
      setData(firstFive);
    }
  }, [allProducts]);

  return (
    <section className="section-spacing bg-cream">
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <div className="dark-section p-12 800px:p-16 mb-0">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-sans text-sm text-cream/50 tracking-widest uppercase font-medium block mb-3">
                Most Popular
              </span>
              <h2 className="font-editorial text-[clamp(2rem,4vw,3.5rem)] font-bold text-cream leading-tight">
                Best Deals<br />
                <span className="italic text-cream/60">this week</span>
              </h2>
            </div>
            <Link to="/best-selling" className="btn-lavender text-sm hidden 800px:inline-flex">
              See All Deals
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {data && data.map((i, index) => (
              <div key={index} className="bg-dark-mid rounded-3xl overflow-hidden group cursor-pointer hover:bg-card-dark transition-colors border border-white/5">
                <div className="aspect-square bg-dark/50 overflow-hidden">
                  <img
                    src={i.images?.[0]?.url}
                    alt={i.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="font-sans text-xs text-cream/40 mb-1">{i.shop?.name}</p>
                  <h3 className="font-editorial font-semibold text-cream text-sm leading-tight mb-2 line-clamp-2">
                    {i.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-editorial font-bold text-lavender">${i.discountPrice}</span>
                    <span className="font-sans text-xs text-cream/30">{i.sold_out} sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
