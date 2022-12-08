import React from "react";
import "../index.css";
import peasants from "../assets/images/peasants.jpg";

const About = () => {
  return (
    <div className="about">
      <h2>The Serf’s Market - A Medieval Stock Exchange</h2>
      <div className="about-contain">
        <span role="img" aria-label="peasants" id="about-pic">
          <img src={peasants} alt="Peasants at the market." />
        </span>
        <div className="desc-contain">
          <p id="description">
            Have you ever wanted to invest in the stock market but been scared
            away by such pesky concepts as “permanent financial embarrassment”
            and “unpredictable asset depreciation leading to irreversible
            domestic ruination”? Fear no more, as the Serf’s Market has come to
            fill the gap in your heart that Wall Street has left! <br></br>
            <br></br>The Serf’s Market is a fictionalized & centralized online
            “stock” market that changes every hour, where users can create their
            own Peasantly Portfolio and compete against others to be the most
            bountiful member of the kingdom’s sub-working class. Buy stock in
            arrows, watch their value crash (or skyrocket in the Indo-Briton
            clash of 1503), and come back later to cash out big!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
