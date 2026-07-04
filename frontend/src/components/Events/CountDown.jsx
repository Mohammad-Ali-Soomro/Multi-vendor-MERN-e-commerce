import React, { useState, useEffect } from "react";
import axios from "axios";

import { server } from "../../server";

const CountDown = ({ data }) => {
  const calculateTimeLeft = () => {
    if (!data?.Finish_Date) return {};
    const difference = +new Date(data?.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (Object.keys(timeLeft).length === 0 && data?._id) {
      axios
        .delete(`${server}/event/delete-shop-event/${data._id}`)
        .then((res) => {
          console.log("Expired event deleted: ", data._id);
        })
        .catch((err) => {
          console.error("Failed to delete expired event: ", err);
        });
    }

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval] !== undefined) {
      timerComponents.push(
        <span key={interval} className="text-[16px] md:text-[20px] font-semibold text-[#f61c0d] mr-2">
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    }
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[16px] md:text-[20px] font-semibold text-[#f61c0d]">
          Time's Up
        </span>
      )}
    </div>
  );
};

export default CountDown;
