import "./updatePitch.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { pitchInputs } from "../../formSource";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const UpdatePitch = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const location = useLocation();
  const { idPitch } = useParams();
  const [pitchEdit, setPitchEdit] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(files);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dkwduwfub/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const updatepitch = {
        ...info,
        photos: list,
      };

      await axios.put(`/pitchs/${idPitch}`, updatepitch);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      if (idPitch) {
        const resp = await axios.get(`/pitchs/find/${idPitch}`);
        if (resp) {
          setInfo(resp?.data);
          setPitchEdit(resp?.data);
        }
      }
    })();
  }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update A Pitch</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {pitchInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={pitchEdit[input.id]}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              {/* <div className="selectChildPitch">
                <label>ChildPitch</label>
                <select id="childPitchs" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((childPitch) => (
                        <option key={childPitch._id} value={childPitch._id}>
                          {childPitch.title}
                        </option>
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

export default UpdatePitch;
