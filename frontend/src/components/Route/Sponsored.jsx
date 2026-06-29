import React from "react";

const Sponsored = () => {
  return (
    <section className="section-spacing-sm bg-cream">
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <p className="text-center font-sans text-sm text-text-muted tracking-widest uppercase font-medium mb-10">
          Partner Brands
        </p>
        <div className="flex items-center justify-around gap-8 flex-wrap opacity-40 hover:opacity-60 transition-opacity">
          {["Sony", "Dell", "LG", "Apple", "Samsung"].map((brand, i) => (
            <span key={i} className="font-editorial font-bold text-2xl text-dark tracking-tight">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsored;
