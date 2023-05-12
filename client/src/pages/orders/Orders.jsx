import "./orders.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Orders = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch(`/orders/${user._id}`);

  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [idDelete, setidDelete] = useState(null);

  useEffect(() => {
    if (data) setList(data);
  }, [data]);

  const handleDelete = async () => {
    try {
      if (idDelete) {
        const res = await axios.delete(`/orders/${idDelete}`);
        navigate("/matchings");
        if (res) {
          handleClose();
          reFetch();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reFetch = async () => {
    try {
      const res = await axios.get(`/orders/${user._id}`);
      setList(res.data);
    } catch (err) {
      throw err;
    }
  };

  const handleClickOpen = (ordersId) => {
    setOpen(true);
    setidDelete(ordersId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = (ordersId) => {
    if (ordersId) {
      navigate(`/payment/${ordersId}`);
      toast.success("Create success payment!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("tutu chua lam` dc!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
                  <th>Confirm</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
                {list.length > 0 &&
                  list.map((order) => (
                    <tr key={order._id}>
                      <td className="tdName">{order.nameChildPitchOrder}</td>
                      <td className="tdPrice">${order.price}</td>
                      <td className="tdTimeFrame">{order.TimeFrame}</td>
                      <td className="tdDate">
                        {moment(order.dateChildPitch).format("DD-MM-YYYY")}
                      </td>
                      {order.isCompleted ? (
                        <td className="tdConfirm">Confirm</td>
                      ) : (
                        <td className="tdUnconfirmed">Unconfirmed</td>
                      )}
                      <td
                        className="deleteButtonOrder"
                        // onClick={() => handleDelete(order._id)}
                        onClick={() =>
                          handleClickOpen(order._id, order.orderMatchId)
                        }
                      >
                        Delete
                      </td>
                      <td
                        className="buyButtonOrder"
                        onClick={() => handleBuy(order._id)}
                      >
                        Buy
                      </td>

                      {/* <Link to={`/payment/${idDelete}`}>
                        <td className="buyButtonOrder">Buy</td>
                      </Link> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Dialog when to use Delete!!!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleDelete()} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Orders;
