import "./orders.css";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import axios from "axios";

const Orders = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/orders`);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [list, setList] = useState([]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/orders/${id}`);
      setList(list.filter((order) => order._id !== id));
    } catch (err) {}
  };

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
          <div className="container">
            <div className="title">
              <h1>Orders</h1>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                {data.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img className="image" src={order.img} alt="" />
                    </td>
                    <td>{order.namePitchOrder}</td>
                    <td>{order.title}</td>
                    <td>{order.price}</td>
                    <td
                      className="deleteButtonOrder"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </td>
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
