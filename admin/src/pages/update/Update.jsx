import "./update.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = ({ inputs, title }) => {
  const [file, setFile] = useState();
  const [info, setInfo] = useState({});
  const [preview, setPreview] = useState();

  const { idUser } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.put(
        "https://api.cloudinary.com/v1_1/dkwduwfub/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const updateUser = {
        ...info,
        img: url,
      };

      await axios.put(`/auth/${idUser}`, updateUser);
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(
        "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
      );
      return;
    } else {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  useEffect(() => {
    (async () => {
      if (idUser) {
        const resp = await axios.get(`/auth/find/${idUser}`);
        if (resp) {
          setInfo(resp?.data);
        }
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     if (idUser) {
  //       const resp = await axios.get(`/auth/find/${idUser}`);
  //       if (resp) {
  //         setInfo(resp?.data);
  //       }
  //     }
  //   })();
  // }, []);

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img className="imageUpdate" src={(preview, info.img)} alt="" />
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>

                  {input.id == "password" ? (
                    <input
                      disabled
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                      value={info[input.id]}
                    />
                  ) : (
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                      value={info[input.id]}
                    />
                  )}
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
