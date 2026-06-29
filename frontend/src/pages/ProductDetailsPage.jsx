import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEvent = searchParams.get("isEvent");

  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (isEvent !== null) {
      const eventData = allEvents && allEvents.find((i) => i._id === id);
      setData(eventData);
    } else {
      const productData = allProducts && allProducts.find((i) => i._id === id);
      setData(productData);
    }
  }, [allProducts, allEvents, id, isEvent]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {isEvent === null && data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
