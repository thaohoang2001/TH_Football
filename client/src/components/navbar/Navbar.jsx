import {
  faFutbol,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleClickLogOut = async () => {
    dispatch({ type: "LOGOUT"});
    navigate("/login");
  }
  
  const handleClickCart = async () => {
    navigate("/orders");
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <FontAwesomeIcon icon={faFutbol} />
          <span className="logo">TH Football</span>
        </Link>
        
          <Link to="/login">
            {user ? (
              user?.username
            ) : (
              <div className="navItems">
                <button className="headerBtnIn">Login</button>
              </div>
            )}
          </Link>
      
          {user && <button onClick={handleClickLogOut} className="headerBtnOut">Logout</button> }
          {user && <FontAwesomeIcon icon={faShoppingCart} className="headerCart" onClick={handleClickCart} />}
      </div>
    </div>
  );
};

export default Navbar;
