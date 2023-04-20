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
                  <img src="data:image/png;base64,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" />
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
                  <span className="match-score-number">10</span>
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
