import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  // const { ordersId } = useParams();


  useEffect(() => {
    const makeRequest = async () => {
      try {
       const res = await axios.put(`http://localhost:8000/api/orders`, {payment_intent});
        // setTimeout(() => {
        //   navigate(`/orders/${user._id}`);
        // }, 2000);
        console.log(res);
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
