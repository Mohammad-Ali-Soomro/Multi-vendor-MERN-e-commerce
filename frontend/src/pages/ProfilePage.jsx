import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10 gap-6`}>
            <div className="w-[60px] 800px:w-[335px] sticky top-[10px] z-10">
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <div className="flex-1">
              <ProfileContent active={active} />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
