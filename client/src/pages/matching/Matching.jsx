import React from "react";
import "./matching.css";

const Matching = () => {

  return (
    <div>
      <div className="container">
        <div className="match">
          <div className="match-header">
            {/* <div className="match-status">Live</div> */}
            <div className="match-tournament">
              <img src="https://assets.codepen.io/285131/pl-logo.svg" />
              TH_Football
            </div>
            <div className="match-actions"></div>
          </div>
          <div className="match-content">
            <div className="column">
              <div className="team team--home">
                <div className="team-logo">
                  <img src="https://assets.codepen.io/285131/chelsea.svg" />
                </div>
                <h2 className="team-name">Team 1</h2>
              </div>
            </div>
            <div className="column">
              <div className="match-details">
                <div className="match-date">
                  3 May at <strong>17:30</strong>
                </div>
                <div className="match-score">
                  <span className="match-score-number match-score-number--leading">
                    3
                  </span>
                  <span className="match-score-divider">:</span>
                  <span className="match-score-number">1</span>
                </div>
                <div className="match-time-lapsed">90'</div>
                <button className="match-bet-place">View Detail</button>
              </div>
            </div>
            <div className="column">
              <div className="team team--away">
                <div className="team-logo">
                  <img src="https://resources.premierleague.com/premierleague/badges/t1.svg" />
                </div>
                <h2 className="team-name"> Team 2</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
