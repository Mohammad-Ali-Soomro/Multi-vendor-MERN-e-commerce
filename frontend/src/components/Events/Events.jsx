import React from "react";
import { useSelector } from "react-redux";

import EventCard from "./EventCard";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`${styles.section} my-10`}>
      <h2 className={`${styles.heading}`}>Popular Events</h2>
      {allEvents && allEvents.length !== 0 ? (
        <div className="w-full">
          <EventCard data={allEvents[0]} />
        </div>
      ) : (
        <h5 className="text-center text-gray-500 py-10 font-[500] text-[18px]">
          No Events have!
        </h5>
      )}
    </div>
  );
};

export default Events;
