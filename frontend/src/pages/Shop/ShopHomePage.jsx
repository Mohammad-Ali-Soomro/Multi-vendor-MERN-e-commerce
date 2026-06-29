import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import styles from "../../styles/styles";

const ShopHomePage = () => {
  return (
    <div>
      <Header />
      <div className={`${styles.section} py-10 bg-[#f5f5f5] flex justify-between gap-6 flex-col md:flex-row`}>
        <div className="w-full md:w-[25%] sticky top-[10px] z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-full md:w-[72%]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopHomePage;
