import "./createMessage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CreateMessage = () => {
  const navigate = useNavigate();

  const [account, setaccount] = useState([]);

  const { data, loading } = useFetch("/users");

  const handleClick = async (e) => {
   
    try {
      const res = await axios.post(`/conversations`, {
        to: age,
      });
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const [age, setAge] = useState("");
  const handleChangeOpponent = (events) => {
    setAge(events.target.value);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Create a Message</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <div className="formInput">
                <label>Choose a User to create message: </label>
                <Box sx={{ minWidth: 300 }}>
                  <FormControl fullWidth>
                    <InputLabel shrink htmlFor="select-multiple-native">
                      Users
                    </InputLabel>
                    <Select
                      native
                      label="Users"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      onChange={handleChangeOpponent}
                    >
                      {/* <MenuItem> */}
                      {loading
                        ? "loading"
                        : data &&
                          data.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.username}
                            </option>
                          ))}
                      {/* </MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <button className="SubmitButton" onClick={(e) => handleClick(e)}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMessage;
