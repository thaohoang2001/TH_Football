import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import JoinFullIcon from '@mui/icons-material/JoinFull';
import StadiumIcon from '@mui/icons-material/Stadium';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);

  const handleClick = async () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">TH Football Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Manager Account</span>
            </li>
          </Link>
          <Link to="/pitchs" style={{ textDecoration: "none" }}>
            <li>
              <StadiumIcon className="icon" />
              <span>Manager Pitch</span>
            </li>
          </Link>
          <Link to="/childPitchs" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Manager ChildPitch</span>
            </li>
          </Link>
          <Link to="/matchings" style={{ textDecoration: "none" }}>
            <li>
              <JoinFullIcon className="icon" />
              <span>Matching</span>
            </li>
          </Link>
          {/* <p className="title">USEFUL</p>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          <p className="title">USER</p>
          <li onClick={handleClick}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
