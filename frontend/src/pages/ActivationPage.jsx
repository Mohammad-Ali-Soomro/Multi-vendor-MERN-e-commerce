import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          setStatus("success");
        } catch (err) {
          setStatus("error");
          setErrorMessage(
            err.response?.data?.message || "Activation failed. Please try again."
          );
        }
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow rounded-lg max-w-md">
        {status === "loading" && (
          <h2 className="text-2xl font-[600] text-gray-600">
            Activating your account...
          </h2>
        )}
        {status === "error" && (
          <h2 className="text-2xl font-[600] text-red-600">
            {errorMessage}
          </h2>
        )}
        {status === "success" && (
          <h2 className="text-2xl font-[600] text-green-600">
            Your account has been created successfully!
          </h2>
        )}
      </div>
    </div>
  );
};

export default ActivationPage;
