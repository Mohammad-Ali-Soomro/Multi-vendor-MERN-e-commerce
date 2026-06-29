import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/ShopLogin";

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isLoading === false && isSeller) {
      navigate("/dashboard");
    }
  }, [isSeller, isLoading, navigate]);

  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
