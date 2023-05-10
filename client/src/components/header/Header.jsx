import {
  faCalendarDays,
  faFootball,
  faLocation,
  faMagnifyingGlass,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { Link } from "react-router-dom";
import DistrictData from "../../districtData.json";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

const Header = ({ type }) => {
  const { data } = useFetch("/pitchs");

  const dataDistrict = DistrictData;

  const [filteredData, setFilteredData] = useState([]);
  const [destination, setDestination] = useState("");

  const [errorEmpty, setErrorEmpty] = useState(false);

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      key: "selection",
    },
  ]);

  const [openSlide, setopenSlide] = useState(false);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setDestination(searchWord);
    const newFilter = dataDistrict.filter((value) => {
      return value.district.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleClickData = (e) => {
    setDestination(e);
    console.log(e);
    setFilteredData([]);
  };

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    if (destination.length == 0) {
      setErrorEmpty(true);
      toast.error("The destination is not empty!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates } });
      navigate("/pitchs", { state: { destination, dates } });
    }
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <Link to="/">
            <div className="headerListItem ">
              <FontAwesomeIcon icon={faFootball} />
              <span>Football</span>
            </div>
          </Link>
          <Link to="/matching">
            <div className="headerListItem">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span>Matching</span>
            </div>
          </Link>
          <Link to="/messages">
            <div className="headerListItem">
              <FontAwesomeIcon icon={faMessage} />
              <span>Message</span>
            </div>
          </Link>
        </div>

        {type !== "list" && (
          <>
            <h1 className="headerTitle">Football is my life</h1>
            <p className="headerDesc">
              But most men love and are passionate about the sport of
              "football". – Football is not simply a game, it is a way of life.
            </p>

            <div className="headerSearch">
              <div className="headerSearchItemWrapper">
                <div className="headerSearchItem">
                  <FontAwesomeIcon
                    icon={faLocation}
                    className="headerIcon"
                    onClick={() => {
                      setopenSlide(!openSlide);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Select the destionation?"
                    className="headerSearchInput"
                    value={destination}
                    onChange={handleFilter}
                    // onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                {filteredData.length != 0 && (
                  <div className="dataResult">
                    {filteredData.map((value) => {
                      return (
                        <span
                          className="dataItem"
                          target="_blank"
                          onClick={() => handleClickData(value.district)}
                        >
                          {value.district}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
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
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            {errorEmpty && destination.length <= 0 ? (
              <div className="headerError">
                <label className="headerEmpty">
                  The destination is not empty
                </label>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
