import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllProductsShop } from "../../redux/actions/product";
import { getAllEventsShop } from "../../redux/actions/event";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import styles from "../../styles/styles";

const ShopProfileData = ({ isOwner }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);

  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const allReviews = products
    ? products.map((p) => p.reviews || []).flat()
    : [];

  return (
    <div className="w-full bg-white shadow-sm border rounded-[5px] p-5 space-y-6">
      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b pb-2 flex-wrap gap-4">
        <div className="flex space-x-6">
          <div className="relative">
            <h5
              className="text-[16px] md:text-[18px] font-[600] cursor-pointer"
              onClick={() => setActive(1)}
              style={{ color: active === 1 ? "crimson" : "#333" }}
            >
              Shop Products
            </h5>
            {active === 1 && <div className={`${styles.active_indicator}`} />}
          </div>
          <div className="relative">
            <h5
              className="text-[16px] md:text-[18px] font-[600] cursor-pointer"
              onClick={() => setActive(2)}
              style={{ color: active === 2 ? "crimson" : "#333" }}
            >
              Running Events
            </h5>
            {active === 2 && <div className={`${styles.active_indicator}`} />}
          </div>
          <div className="relative">
            <h5
              className="text-[16px] md:text-[18px] font-[600] cursor-pointer"
              onClick={() => setActive(3)}
              style={{ color: active === 3 ? "crimson" : "#333" }}
            >
              Shop Reviews
            </h5>
            {active === 3 && <div className={`${styles.active_indicator}`} />}
          </div>
        </div>

        {/* Dashboard Link if Owner */}
        {isOwner && (
          <Link to="/dashboard">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-sm transition">
              Go Dashboard
            </button>
          </Link>
        )}
      </div>

      {/* active=1: Grid of products */}
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px]">
          {products &&
            products.map((item, index) => (
              <ProductCard data={item} key={index} />
            ))}
        </div>
      )}

      {/* active=2: Grid of running events */}
      {active === 2 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px]">
          {allEvents &&
            allEvents.map((item, index) => (
              <ProductCard data={item} key={index} isEvent={true} />
            ))}
        </div>
      )}

      {/* active=3: List of reviews */}
      {active === 3 && (
        <div className="space-y-6">
          {allReviews && allReviews.length !== 0 ? (
            allReviews.map((item, index) => (
              <div className="flex my-4 border-b pb-4 last:border-0" key={index}>
                <img
                  src={item.user?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
                  alt=""
                  className="w-[45px] h-[45px] rounded-full object-cover mr-3 border"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base">{item.user?.name}</h4>
                  <div className="my-1">
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm">{item.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-gray-500 font-[500] text-center py-10">No reviews yet for this shop!</h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
