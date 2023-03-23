import "./newchildPitch.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { childPitchInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewChildPitch = () => {
  const [info, setInfo] = useState({});
  const [pitchId, setPitchId] = useState(undefined);
  const [childPitchs, setChildPitchs] = useState([]);

  const { data, loading, error } = useFetch("/pitchs");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const childPitchNumbers = childPitchs.split(",").map((childPitch) => ({ number: childPitch }));
    try {
      await axios.post(`/childPitchs/${pitchId}`, { ...info, childPitchNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
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
                <label>ChildPitchs</label>
                <textarea
                  onChange={(e) => setChildPitchs(e.target.value)}
                  placeholder="give comma between childPitch numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a childPitch</label>
                <select
                  id="pitchId"
                  onChange={(e) => setPitchId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((pitch) => (
                        <option key={pitch._id} value={pitch._id}>{pitch.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChildPitch;