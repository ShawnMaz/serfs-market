import React from "react";

const News = ({ event, index }) => {


  return (
    <section className='newsItem' style={{opacity: 1 - (index / 10)}}>
          <p>{event.eventName}</p>
          <p>{event.eventDescription}</p>
          <p>Posted at: {event.date}</p>
    </section>
  );
};

export default News;
