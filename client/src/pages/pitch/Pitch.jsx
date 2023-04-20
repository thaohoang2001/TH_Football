import "./pitch.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reviews from "../../components/reviews/Reviews";
import Reserve from "../../components/reserve/Reserve";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const Pitch = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/pitchs/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1) {
    const timeDiff = date1.getTime();
    // Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
      // navigate(`/payment/${id}`);
    } else {
      navigate("/login");
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "1h-2h",
    "2h-3h",
    "3h-4h",
    "4h-5h",
    "5h-6h",
    "6h-7h",
    "7h-8h",
    "8h-9h",
    "9h-10h",
    "10h-11h",
    "11h-12h",
    "12h-13h",
    "12h-13h",
    "13h-14h",
    "14h-15h",
    "15h-16h",
    "16h-17h",
  ];

  const [personName, setPersonName] = useState([]);
  const handleChangeTimeFrame = (events) => {
    const {
      target: { value },
    } = events;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="pitchContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="pitchWrapper">
            <h1 className="pitchTitle">{data.name}</h1>
            <div className="pitchAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="pitchDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="pitchPriceHighlight">
              Book a pitch ${data.cheapestPrice} at this Pitch and get a free
              water and ball
            </span>
            <div className="pitchImages">
              {data.photos?.map((photo, i) => (
                <div className="pitchImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="pitchImg"
                  />
                </div>
              ))}
            </div>
            <div className="pitchDetails">
              <div className="pitchDetailsTexts">
                <h1 className="pitchTitle">{data.title}</h1>
                <p className="pitchDesc">{data.desc}</p>
              </div>
              <div className="pitchDetailsPrice">
                <h1>Perfect for a {days} play football!</h1>
                <span>
                  Located in the real heart of Hanoi, this pitch has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${data.cheapestPrice}</b>
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <div className="formInputTimeFrame">
            <label>Choose a TimeFrame：</label>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                TimeFrame
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChangeTimeFrame}
                input={<OutlinedInput label="TimeFrame" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      )}

      {user?.role === "customer" && <Reviews pitchId={id} />}

      {openModal && <Reserve setOpen={setOpenModal} pitchId={id} />}
    </div>
  );
};

export default Pitch;
