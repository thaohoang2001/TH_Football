import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { AuthContext } from "../../context/AuthContext";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const { user } = useContext(AuthContext);


  useEffect(() => {
    const makeRequest = async () => {
      try {
        await axios.put(`http://localhost:8000/api/orders`);
        setTimeout(() => {
          navigate(`/orders/${user._id}`);
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div>
        Payment successful. You are being redirected to the orders page. Please
        do not close the page
      </div>
    </div>
  );
};

export default Success;
