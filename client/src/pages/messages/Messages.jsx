import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./messages.css";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Messages = () => {
  const { user } = useContext(AuthContext);

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
            <div className="title">
              <h1>Messages</h1>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>{user.isAdmin ? "Customer" : "Staff"}</th>
                  <th>Last Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
                {data.map((c) => (
                  <tr
                    className={
                      ((user.isAdmin && !c.readByStaff) ||
                        (!user.isAdmin && !c.readByCustomer)) &&
                      "active"
                    }
                    key={c.id}
                  >
                    <td>{user.isAdmin ? c.customerId : c.staffId}</td>
                    <td>
                      <Link to={`/message/${c.id}`} className="link">
                        {c?.lastMessage?.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      {((user.isAdmin && !c.readByStaff) ||
                        (!user.isAdmin && !c.readByCustomer)) && (
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
