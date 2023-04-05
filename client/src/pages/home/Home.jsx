import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <img src="https://pitchbooking.com/img/heroFootballPitchDay.svg" alt="" className="homeImg"/>
      </div>
    </div>
  );
};

export default Home;