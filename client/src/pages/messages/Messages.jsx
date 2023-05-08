import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./messages.css";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { Button } from "react-bootstrap";

const Messages = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };




  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="messages">
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="container">
            {/* <div className="title">
              <h1>Messages</h1>
            </div> */}
            <div className="btnTitle">
              <Link to = {"/createMessage"}>
                <button className="btnCreate">Create Message</button>
              </Link>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>{user.role === "admin" ? "Admin" : "Customer"}</th>
                  {console.log(user.role)}
                  <th>User Name</th>
                  <th>Last Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
                {data.map((c) => (
                  <tr
                    className={
                      ((user.role === "admin" && !c.readByStaff) ||
                        (user.role === "customer" && !c.readByCustomer)) &&
                      "active"
                    }
                    key={c.id}
                  >
                    <td>{user.role === "admin" ? c.customerId : c.staffId}</td>
                    <td>{user.username}</td>
                    <td>
                      <Link to={`/message/${c.id}`} className="link">
                        {c?.lastMessage?.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      {((user.role === "admin"  && !c.readByStaff) ||
                        (user.role === "customer" && !c.readByCustomer)) && (
                        <button onClick={() => handleRead(c.id)}>
                          Mark as Read
                        </button>
                      )}
                    
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

export default Messages;
