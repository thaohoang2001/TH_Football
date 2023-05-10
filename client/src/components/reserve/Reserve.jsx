import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Reserve = ({ setOpen, pitchId }) => {
  const { user } = useContext(AuthContext);
  const [selectedchildPitchs, setSelectedchildPitchs] = useState([]);

  const [filterChildPitch, setFilterChildPitch] = useState({
    findMatch: false,
    timeFrame: "1h-2h",
  });

  const [selectdata, setselectdata] = useState([]);

  const { data } = useFetch(`/pitchs/childPitch/${pitchId}`);

  useEffect(() => {
    if (data) setselectdata(data);
    console.log(data);
  }, [data]);

  const { dates } = useContext(SearchContext);

  // const getDatesInRange = (startDate) => {
  //   const start = new Date(startDate);

  //   const date = new Date(start.getTime());

  //   const dates = [];

  //   dates.push(new Date(date).getTime());
  //   date.setDate(date.getDate() + 1);

  //   return dates;
  // };


  
  console.log(dates);

  const handleOpponent = async (e, childPitchId, title, price) => {
    e.preventDefault();
    try {
        const resp = await axios.post("/matchings", {
          ...filterChildPitch,
          childPitchId: childPitchId,
          userId: user._id,
          userName: user.username,
          userImage: user.img,
          childPitchName: title,
          priceChildPitch: price,
          dateChildPitch: dates[0].startDate,
        });
        console.log(resp);
        toast.success("Book the childPitch Successfully!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/matching")

    } catch (e) {
      console.log(e);
    }
  };


  const navigate = useNavigate();

  const handleFindMatch = async () => {
    setFilterChildPitch((prev) => ({
      ...prev,
      findMatch: !prev.findMatch,
    }));
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
    "13h-14h",
    "14h-15h",
    "15h-16h",
    "16h-17h",
  ];

  const [personName, setPersonName] = useState([]);

  const handleChangeTimeFrame = async (events) => {
    setPersonName(events.target.value);
    setFilterChildPitch((prev) => ({
      ...prev,
      timeFrame: events.target.value,
    }));

    const payload = {
      // pitchId: id.id,
      findMatch: filterChildPitch.findMatch,
      timeFrame: events.target.value,
    };

    //call api
    try {
      console.log(filterChildPitch);
      const res = await axios.post("/childPitchs/filter", payload);
      console.log(res);
      setselectdata(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your childPitchs to book the childPitchs available:</span>
        <div className="formInput">
          <label>Choose a TimeFrame：</label>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">TimeFrame</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              value={personName}
              onChange={handleChangeTimeFrame}
              input={<OutlinedInput label="TimeFrame" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="formInput">
          <FormGroup>
            <FormControlLabel
              control={<Switch />}
              onChange={handleFindMatch}
              label="Match opponent"
            />
          </FormGroup>
        </div>

        {selectdata.length > 0 &&
          selectdata.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">Title: {item.title}</div>
                <div className="rDesc">Desc: {item.desc}</div>
                <div className="rDesc">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rDesc">Price: {item.price}</div>
              </div>
              <div className="rDesc">
                <button
                  onClick={(e) => handleOpponent(e, item._id, item.title, item.price)}
                  className="rButton"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        {/* <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button> */}
      </div>
    </div>
  );
};

export default Reserve;
