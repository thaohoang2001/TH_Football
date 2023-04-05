import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button, Col } from "react-bootstrap";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <section>
      <div className="imgBx">
        <img
          src= ""
          // "https://images.pexels.com/photos/2570139/pexels-photo-2570139.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          // style={{ zIndex: '1', mixBlendMode: "overlay" }}
        />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <Col className="login-form-col newlogin-col">
            <h2>Login</h2>
            <h3>Let's get started!</h3>
            <label className="login-label">Email</label>
            <div className="login-div">
              <input
                className="login-input"
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <label className="login-label">Password</label>
            <div className="login-div">
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              disabled={loading}
              onClick={handleClick}
              className="login-btn"
            >
              Login
            </Button>
            {error && <span className="error-message">{error.message}</span>}
          </Col>
        </div>
      </div>
    </section>
  );
};

export default Login;
