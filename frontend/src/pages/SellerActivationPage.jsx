import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { server } from "../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          await axios.post(`${server}/shop/activation`, {
            activation_token,
          });
        } catch (err) {
          setError(true);
        }
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow rounded-lg max-w-md">
        {error ? (
          <h2 className="text-2xl font-[600] text-red-600">
            Your token is expired!
          </h2>
        ) : (
          <h2 className="text-2xl font-[600] text-green-600">
            Your shop account has been created successfully!
          </h2>
        )}
      </div>
    </div>
  );
};

export default SellerActivationPage;
