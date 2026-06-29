import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && allEvents && allEvents.length !== 0 && (
        <div className={`${styles.section} my-10`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            <EventCard data={allEvents[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
