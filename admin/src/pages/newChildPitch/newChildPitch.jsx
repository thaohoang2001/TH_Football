import "./newChildPitch.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { childPitchInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const NewChildPitch = () => {
  const [info, setInfo] = useState({});
  const [pitchId, setPitchId] = useState(undefined);

  const navigate = useNavigate();

  const { data, loading, error } = useFetch("/pitchs");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/childPitchs/${pitchId}`, {
        ...info,
      });
      navigate("/childPitchs");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);

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
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New ChildPitch</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {childPitchInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="formInput">
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

              <div className="formInput">
                <label>Choose a Pitch</label>
                <select
                  id="pitchId"
                  onChange={(e) => setPitchId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((pitch) => (
                        <option key={pitch._id} value={pitch._id}>
                          {pitch.name}
                        </option>
                      ))}
                </select>
              </div>
              <button className="BtnSend" onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChildPitch;
