import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import EventCard from "./EventCard";
import Loader from "../Layout/Loader";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <section className="section-spacing bg-cream">
        <div className="w-11/12 max-w-[1200px] mx-auto">
          <div className="lavender-section p-12 800px:p-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="font-sans text-sm text-dark/50 tracking-widest uppercase font-medium block mb-3">
                  Limited Time
                </span>
                <h2 className="font-editorial text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark leading-tight">
                  Flash Sales &<br />
                  <span className="italic">Events</span>
                </h2>
              </div>
              <Link to="/events" className="btn-dark text-sm py-2.5 px-6 hidden 800px:inline-flex">
                All Events
              </Link>
            </div>

            {allEvents && allEvents.length !== 0 ? (
              <EventCard data={allEvents[0]} />
            ) : (
              <div className="text-center py-16">
                <p className="font-editorial text-2xl text-text-muted italic">No events running right now</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
