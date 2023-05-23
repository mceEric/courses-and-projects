import React, { useState } from "react";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";

function ReviewCreation({ getReviews }) {
  const { vbcId } = useParams();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/vbc/${vbcId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        review: review,
        rating: rating,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          return console.log("yes");
        }
        setRating(null);
        setReview("");
        getReviews();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-100 center-content column"
    >
      <Rating
        defaultValue={2}
        precision={0.5}
        value={rating}
        size="large"
        required={true}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <textarea
        className="no-border border-box p-10 m-10 large-font shadow"
        style={{
          width: "70%",
          minWidth: "24em",
          maxWidth: "50em",
          minHeight: "12em",
        }}
        type="text"
        required
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={7}
        placeholder="Review..."
      />
      <button
        disabled={rating === null}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        className={`tube-edges p-5 p-sides content-outline white pointer alt-content-outline ${
          !btnHover ? "component-gradient" : "alt-component-gradient"
        }`}
      >
        Submit
      </button>
    </form>
  );
}

export default ReviewCreation;
