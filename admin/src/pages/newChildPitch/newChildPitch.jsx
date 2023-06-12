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
      await axios.post(`/childPitchs/create/${pitchId}`, {
        ...info,
      });
      navigate("/childPitchs");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  
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
