import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";

const Categories = () => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Branding/trust bar */}
      <section className="bg-dark section-spacing-sm hidden sm:block">
        <div className="w-11/12 max-w-[1200px] mx-auto">
          <p className="text-center font-sans text-sm text-cream/50 mb-10 tracking-widest uppercase font-medium">
            Trusted by professionals everywhere
          </p>
          {/* Marquee */}
          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...brandingData, ...brandingData].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-cream/60 whitespace-nowrap">
                  <span className="text-cream/40">{item.icon}</span>
                  <span className="font-sans font-semibold text-base">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <section className="section-spacing bg-cream">
        <div className="w-11/12 max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-editorial text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark leading-tight">
              Shop by<br />
              <span className="italic text-text-muted">category</span>
            </h2>
            <Link to="/products" className="btn-outline-dark text-sm py-2.5 px-6">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categoriesData && categoriesData.map((i, index) => (
              <div
                key={i.id}
                className={`
                  relative overflow-hidden rounded-3xl cursor-pointer group transition-all duration-300
                  hover:scale-[1.03] hover:shadow-xl
                  ${index === 0 ? 'col-span-2 md:col-span-1 lg:col-span-2 row-span-2' : ''}
                `}
                style={{ 
                  background: index % 3 === 0 ? 'var(--dark)' : index % 3 === 1 ? 'var(--lavender-light)' : 'white',
                  border: '1px solid rgba(26,26,26,0.06)',
                  minHeight: index === 0 ? '280px' : '130px'
                }}
                onClick={() => {
                  navigate(`/products?category=${i.title}`);
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <img
                    src={i.image_Url}
                    className="w-12 h-12 object-contain"
                    alt={i.title}
                  />
                  <div>
                    <h3 
                      className="font-editorial font-semibold text-sm leading-tight"
                      style={{ color: index % 3 === 0 ? 'var(--cream)' : 'var(--dark)' }}
                    >
                      {i.title}
                    </h3>
                    <div 
                      className="w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full mt-1"
                      style={{ background: index % 3 === 0 ? 'var(--lavender)' : 'var(--dark)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
