import "./list.css";
import {
  faCalendarDays,
  faDroplet,
  faFootball,
  faLocation,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  
  const { data, loading, error, reFetch } = useFetch(
    `/pitchs?district=${destination}`
  );

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates } });
    navigate("/pitchs", { state: { destination, dates } });
  };


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {/* <div className="headerSearchList">
            <div className="headerSearchItemList">
              <FontAwesomeIcon icon={faLocation} className="headerIconList" />
              <input
                type="text"
                placeholder="Select the destionation?"
                className="headerSearchInputList"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="headerSearchItemList">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIconList" />
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchTextList"
              >{`${format(dates[0].startDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                />
              )}
            </div>

            <div className="headerSearchItemList">
              <button className="headerBtnList" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div> */}

          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
