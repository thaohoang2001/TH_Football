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
  const [openConfirm, setOpenConfirm] = useState(false);
  const [list, setList] = useState([]);
  const [idDelete, setidDelete] = useState(null);
  const [idConfirm, setidConfirm] = useState(null);

  useEffect(() => {
    if (data) setList(data);
  }, [data]);

  const handleDelete = async () => {
    try {
      if (idDelete) {
        const res = await axios.delete(`/orders/${idDelete}`);
        if (res) {
          handleClose();
          reFetch();
        }
      } else {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
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

  const handleClickOpenDelete = (ordersId) => {
    setOpen(true);
    setidDelete(ordersId);
  };

  const handleClickOpenConfirm = (ordersId) => {
    setOpenConfirm(true);
    setidConfirm(ordersId);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
 

  const handleBuy = async () => {
    if (idConfirm) {
      const res = await axios.put(`/orders/${idConfirm}`);
      if (res) {
        handleCloseConfirm();
        reFetch();
        toast.success("Confirm buy successfully!!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error(error.message, {
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
                  <th>Type Order</th>
                  <th>Confirm</th>
                  <th>ActionDel</th>
                  <th></th>
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

                      {order.findMatch == true && order.userIdMatch ? (
                        <td className="tdMatching">Matching</td>
                      ) : ( 
                        <td className="tdNoMatching">No-Matching</td>
                      )}

                      {order.isCompleted ? (
                        <td className="tdConfirm">Confirm</td>
                      ) : (
                        <td className="tdUnconfirmed">Unconfirmed</td>
                      )}

                      {order.isCompleted ? (
                        <td className="tdPrice">Order Confirmed buy</td>
                      ) : (
                        <td
                          className="deleteButtonOrder"
                          // onClick={() => handleDelete(order._id)}
                          onClick={() =>
                            handleClickOpenDelete(order._id, order.orderMatchId)
                          }
                        >
                          Delete
                        </td>
                      )}

                      {order.isCompleted ? (
                        <td className="tdPrice"></td>
                      ) : (
                        <td
                          className="buyButtonOrder"
                          onClick={() =>
                            handleClickOpenConfirm(
                              order._id,
                              order.orderMatchId
                            )
                          }
                        >
                          Confirm
                        </td>
                      )}
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
              Are you sure to delete this orders?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleDelete()} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Dialog when to use Confirm!!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to Confirm this orders?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button onClick={() => handleBuy()} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      
    </div>
  );
};

export default Orders;
