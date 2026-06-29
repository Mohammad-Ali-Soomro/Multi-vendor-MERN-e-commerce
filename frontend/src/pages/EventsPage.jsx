import React from "react";
import { useSelector } from "react-redux";

import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className={`${styles.section} py-10`}>
            {allEvents && allEvents.length !== 0 ? (
              <EventCard active={true} data={allEvents[0]} />
            ) : (
              <h5 className="text-center text-gray-500 py-10 font-[500] text-[18px]">
                No Events have!
              </h5>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
