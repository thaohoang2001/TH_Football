import React, { useEffect, useState } from "react";
import "./payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkOutForm/CheckOutForm";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(
  "pk_test_51MlxiUBmwcvB4LjP2WwCfnYP4s3wxQUCFOAtKgp7NxWUkAaSQI3MzEsQobuibzC7x8bA6tAaMT3DsSlYSGm80h97004zrX4Z1I"
);

const Payment = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/orders/create-payment-intent/${id}`);
        //   const res = await fetch(`http://localhost:8000/api/orders/create-payment-intent/63ff77b7a6908089a1045be9`, {
        //     method: 'POST',
        // })
        setClientSecret(res.data.clientSecret);
        console.log("Client: ", id );
        
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);
  
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  

  return (
    <div className="pay">
      <Navbar />
      <Header type="list" />
      
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
