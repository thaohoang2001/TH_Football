import React, { useContext, useEffect, useState } from "react";
import "./matching.css";
import useFetch from "../../hooks/useFetch";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Matching = () => {
  const { user } = useContext(AuthContext);

  const { data } = useFetch(`/matchings`);

  const [dataselect, setdataselect] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) setdataselect(data);
    console.log(data);
  }, [data]);

  const handleMatching = async (orderMatchId, userIdMatch, findMatch) => {
    try {
      if (!userIdMatch && findMatch == true) {
        const res = await axios.put(`/matchings/${orderMatchId}`, {
          userIdMatch: user._id,
          userNameMatch: user.username,
          userMatchImage: user.img,
        });
        console.log(res);
        setdataselect(res.data)
        const resp = await axios.post(`/orders/${orderMatchId}`)
        console.log(resp);
        navigate("/orders")
      } else {
        toast.error("Deo cho join day!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="containerMatching">
        {dataselect.length > 0 &&
          dataselect.map((item) => (
            <div className="match" key={item._id}>
              <div className="match-header">
                {/* <div className="match-status">Live</div> */}
                <div className="match-tournament">
                  <img src="https://assets.codepen.io/285131/pl-logo.svg" />
                  {item.childPitchName}
                </div>
                {/* <div className="match-actions"></div> */}
              </div>
              <div className="match-content">
                <div className="column">
                  <div className="team team--home">
                    <div className="team-logo">
                      <img src={item.userImage} />
                    </div>
                    <h2 className="team-name">{item.userName}</h2>
                  </div>
                </div>
                <div className="column">
                  <div className="match-details">
                    <div className="match-score">
                      <span className="match-score-number match-score-number--leading">
                       {item.dateChildPitch}
                      </span>
                    </div>
                    <div className="match-score">
                      <span className="match-time-lapsed">
                        {item.timeFrame}
                      </span>
                    </div>
                    <div className="match-score">
                      <span className="match-score-number">
                        ${item.priceChildPitch}
                      </span>
                    </div>

                    <button
                      className="match-bet-place"
                      onClick={() => handleMatching(item._id, item.userIdMatch, item.findMatch)}
                    >
                      Matching
                    </button>
                  </div>
                </div>
                <div className="column">
                  <div className="team team--away">
                    <div className="team-logo">
                      <img src={item.userMatchImage} />
                    </div>
                    <h2 className="team-name">{item.userNameMatch}</h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Matching;
