import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCreation from "../vbc-creation/review-creation/ReviewCreation";
import ReviewsDisplay from "./reviews-display/ReviewsDisplay";

function VbcDisplay({ content }) {
  const { title, description, email, phoneNumber, field, user, socials } =
    content;
  const { vbcId } = useParams();

  useEffect(() => {
    getReviews();
  }, []);

  function getReviews() {
    fetch(`http://localhost:5000/vbc/${vbcId}/reviews`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((reviews) => {
        console.log(reviews);
        setReviews(reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [reviews, setReviews] = useState([]);

  return (
    <div
      className="full-screen center-content relative column"
      style={{ overflowX: "hidden" }}
    >
      <h1>{title}</h1>
      <h4>{field}</h4>
      <p>{description}</p>
      <p>{email}</p>
      <p>{phoneNumber}</p>
      <p>{user.username}</p>
      {user._id !== localStorage.getItem("user") && (
        <ReviewCreation getReviews={getReviews} />
      )}
      <ReviewsDisplay reviews={reviews} setReviews={setReviews} />
    </div>
  );
}

export default VbcDisplay;
