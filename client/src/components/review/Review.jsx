import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import "./review.css";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      axios.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  const handleDelete = async () => {
    const res = await axios.delete(`/reviews/${review.id}`)
    console.log(res);
  }

  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img
            className="pp"
            src={data?.img || "https://i.ibb.co/MBtqXQ/no-avatar.gif"}
            alt=""
          />
          {console.log(data)}
          <div className="info">
            <span>{data?.username}</span>
            <div className="country">
              <span>{data?.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4BftlymXvdBuWpmKm20ElrIlUkKElAaB81w&usqp=CAU"
              alt=""
              key={i}
            />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      {/* <div className="buttonDelete">
        <button className="btnDelete" onClick={() => handleDelete(review._id)}>Delete</button>
      </div> */}
    </div>
  );
};

export default Review;
