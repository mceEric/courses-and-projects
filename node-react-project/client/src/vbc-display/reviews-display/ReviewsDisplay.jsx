import React from "react";
import ReviewItem from "./ReviewItem";

function ReviewsDisplay({ reviews }) {
  return (
    <div
      className="flex justify-center row wrap m-5 gradient-bg scroll-overflow-y"
      style={{ width: "90%", height: "32em" }}
    >
      {[...reviews].reverse().map((review) => {
        return <ReviewItem review={review} />;
      })}
    </div>
  );
}

export default ReviewsDisplay;
