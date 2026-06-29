import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import EventCard from "../components/Events/EventCard";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <br />
          <br />
          <div className="w-11/12 mx-auto">
            {allEvents && allEvents.length !== 0 ? (
              <EventCard active={true} data={allEvents[0]} />
            ) : (
              <h1 className="text-center pb-[100px] text-[20px] font-semibold text-gray-700">
                No Events Found!
              </h1>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
