import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, pitchId }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [selectedchildPitchs, setSelectedchildPitchs] = useState([]);
  const { data, loading, error } = useFetch(`/pitchs/childPitch/${pitchId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (childPitchNumber) => {
    const isFound = childPitchNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedchildPitchs(
      checked
        ? [...selectedchildPitchs, value]
        : selectedchildPitchs.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedchildPitchs.map((childPitchId) => {
          const res = axios.put(`/childPitchs/availability/${childPitchId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate(`/payment/${id}`);
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your childPitchs:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectChildPitchs">
              {item.childPitchNumbers.map((childPitchNumber) => (
                <div className="childPitchs">
                  <label>{childPitchNumber.number}</label>
                  <input
                    type="checkbox"
                    value={childPitchNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(childPitchNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
