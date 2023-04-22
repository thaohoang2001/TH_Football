import "./opponentPitch.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const OpponentPitch = () => {
  const [info, setInfo] = useState({});
  const [pitchId, setPitchId] = useState(undefined);
  const { data, loading, error } = useFetch("/pitchs");
  const navigate = useNavigate();

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      key: "selection",
    },
  ]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newpitch = {
        ...info,
      };

      await axios.get("/", newpitch);
      navigate("/pitchs");
    } catch (err) {
      console.log(err);
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
    '1h-2h',
    '2h-3h',
    '3h-4h',
    '4h-5h',
    '5h-6h',
    '6h-7h',
    '7h-8h',
    '8h-9h',
    '9h-10h',
    '10h-11h',
    '11h-12h',
    '12h-13h',
    '12h-13h',
    '13h-14h',
    '14h-15h',
    '15h-16h',
    '16h-17h',
  ];

  const [personName, setPersonName] = useState([]);
  const handleChange = (events) => {
    const {
      target: { value },
    } = events;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Choose The Opponent Pitch</h1>
        </div>
        <div className="bottom">
          <div className="right">

            <div className="formInput">
              <label>Choose a Days：</label>
              <div className="OpponentPitchSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="OpponentPitchIcon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="OpponentPitchSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="OpponentPitchDates"
                    minDate={new Date()}
                  />
                )}
              </div>
            </div>

            <div className="formInput">
              <label>Choose a TimeFrame：</label>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">TimeFrame</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
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

            <button className="SubmitButton" onClick={handleClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpponentPitch;
