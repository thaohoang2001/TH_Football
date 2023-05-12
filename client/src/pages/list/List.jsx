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
import { Link, useLocation } from "react-router-dom";
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

          <div className="headerSearchList">
            <h1 className="TitleHeader">List of Pitch</h1>
          </div>
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
            ) : !destination == data ? (
              <div className="listNotFound">
                <img
                  src="https://media.istockphoto.com/id/1291928983/vector/black-oops-thin-line-icon.jpg?s=612x612&w=0&k=20&c=CI7dqqM7qYmHrxosfrBfpWBINJzLvB0wnL9mIw49vjo="
                  className="listImageNotFound"
                ></img>
                <h3 className="listTitleTwo">
                  Oops, nothing pitch has district of input here...
                </h3>
                <p className="listPara">Please Check the input</p>
                <p className="listPara">
                  Otherwise,
                  <Link to={"/"}>
                    <a className="listLink"> Click here </a>
                  </Link>
                  to redirect homepage to Search again.
                </p>
              </div>
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
