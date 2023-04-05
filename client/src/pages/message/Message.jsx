import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./message.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Message = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      axios.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return axios.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="message">
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">Messages</Link>
          </span>
          {isLoading ? (
            "loading"
          ) : error ? (
            "error"
          ) : (
            <div className="messages">
              {data.map((m) => (
                <div
                  className={m.userId === user._id ? "owner item" : "item"}
                  key={m._id}
                >
                  <img
                    src={user.img} 
                    alt=""
                  />
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          )}
          <hr />
          <form className="write" onSubmit={handleSubmit}>
            <textarea type="text" placeholder="write a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
