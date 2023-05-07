import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button, Col } from "react-bootstrap";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    username: undefined,
    role: "customer",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_SUCCESS" });
    try {
      const res = await axios.post("/auth/register", credentials);
      if (res?.data) {
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
        navigate("/login");

      } else {
        dispatch({
          type: "REGISTER_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <section>
      <div className="imgBx">
        <img
          src=""
          // "https://images.pexels.
          // com/photos/2570139/pexels-
          // photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          style={{ zIndex: '1', mixBlendMode: "overlay" }}
        />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <Col className="register-form-col newregister-col">
            <h2>Register</h2>
            <h3>Let's get started!</h3>
            <label className="register-label">Email</label>
            <div className="register-div">
              <input
                className="register-input"
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <label className="register-label">Password</label>
            <div className="register-div">
              <input
                className="register-input"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <label className="register-label">Username</label>
            <div className="register-div">
              <input
                className="register-input"
                type="username"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            {/* <label className="register-label">Role</label>
            <div className="register-div">
              <span
                
                className="register-input"
                type="role"
                placeholder="Role"
                id="role"
              /> Customer
            </div> */}
            <Button
              disabled={loading}
              onClick={handleClick}
              className="register-btn"
            >
              Register
            </Button>
            {error && <span className="error-message">{error.message}</span>}
          </Col>
        </div>
      </div>
    </section>
  );
};

export default Register;
