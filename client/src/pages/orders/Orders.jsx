import "./orders.css";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import axios from "axios";

const Orders = ({ ordersId }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/orders`);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/orders/${ordersId}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuy = () => {
    navigate(`/payment/${ordersId}`)
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="orders">
        {loading ? (
          "loading"
        ) : error ? (
          "error no data"
        ) : (
          <div className="containerOders">
            <div className="titles">
              <h1>Orders</h1>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>TimeFrame</th>
                  <th>DateOder</th>
                  <th>Action</th>
                </tr>
                {data.map((order) => (
                  <tr key={order._id}>
                    <td className="tdName">{order.nameChildPitchOrder}</td>
                    <td className="tdPrice">${order.price}</td>
                    <td className="tdTimeFrame">{order.TimeFrame}</td>
                    <td className="tdDate"></td>
                    <td
                      className="deleteButtonOrder"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </td>
                    <td className="buyButtonOrder" onClick={handleBuy}>Buy</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
