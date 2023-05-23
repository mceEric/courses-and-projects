import React from "react";
import { Rating } from "@mui/material";

function ReviewItem({ review }) {
  return (
    <div
      className="flex column m-10 p-10 relative white-bg content-outline break-word"
      style={{ width: "40%", minWidth: "8em" }}
    >
      <Rating
        defaultValue={review.rating}
        precision={0.5}
        size="small"
        readOnly
      />

      <p>{review.review}</p>

      <div className="mt-20 pt-5">
        <h4 className="absolute" style={{ right: "1em", bottom: "0em" }}>
          {review.author.username}
        </h4>
      </div>
    </div>
  );
}

export default ReviewItem;
