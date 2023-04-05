import "./updateChildPitch.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { childPitchInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateChildPitch = () => {
  const [info, setInfo] = useState({});
  const [childPitchs, setchildPitchs] = useState([]);

  const {idChildPitch} = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch("/pitchs");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const childPitchNumbers = childPitchs.map((childPitch) => ({ number: childPitch }));
    try {
      await axios.put(`/childPitchs/${idChildPitch}`, { ...info });
      navigate("/childPitchs")
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      if (idChildPitch) {
        const resp = await axios.get(`/childPitchs/${idChildPitch}`);
        if (resp) {
          setInfo(resp?.data);
        }
      }
    })();
  }, []);

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update A ChildPitch</h1>
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
                    value={info[input.id]}
                  />
                </div>
              ))}
              {/* <div className="formInput">
                <label>ChildPitchs</label>
                <textarea
                  onChange={(e) => setchildPitchs(e.target.value)}
                  placeholder="give comma between childPitch numbers."
                //   value={info.setchildPitchs}
                />
              </div>
              <div className="formInput">
                <label>Choose a childPitch</label>
                <select
                  id="pitchId"
                  onChange={(e) => setPitchId(e.target.value)}
                //   value={info.pitchId}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((pitch) => (
                        <option key={pitch._id} value={pitch._id}>{pitch.name}</option>
                      ))}
                </select>
              </div> */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateChildPitch;