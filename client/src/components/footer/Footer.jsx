import "./footer.css";
import {
  faFootball,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <h3>TH Football</h3>
        <p>This is a soccer field booking site for everyone. Thanks for visiting.</p>
        <ul className="socials">
          <li><a href="#"><i className="fa fa-facebook"></i><FontAwesomeIcon icon={faFootball} /></a></li>
          <li><a href="#"><i className="fa fa-instagram"><FontAwesomeIcon icon={faFootball} /></i></a></li>
          <li><a href="#"><i className="fa fa-youtube"><FontAwesomeIcon icon={faFootball} /></i></a></li>
          <li><a href="#"><i className="fa fa-google"><FontAwesomeIcon icon={faFootball} /></i></a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;