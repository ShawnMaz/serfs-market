import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_NEWS } from "../utils/queries";

const News = ({ event }) => {


  return (
    <section className='newsItem'>
          <p>{event.eventName}</p>
          <p>{event.eventDescription}</p>
          <p>Posted at: {event.date}</p>
          <p>---</p>
    </section>
  );
};

export default News;
