import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts && data) {
      const filtered = allProducts.filter(
        (i) => i.category === data.category && i._id !== data._id
      );
      setProducts(filtered);
    }
  }, [allProducts, data]);

  return (
    <div>
      {data && products && products.length !== 0 ? (
        <div className={`${styles.section} p-4 sm:p-0 mb-12`}>
          <h2 className={`${styles.heading} text-[25px] font-[500] border-b pb-2 mb-5`}>
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]">
            {products.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
