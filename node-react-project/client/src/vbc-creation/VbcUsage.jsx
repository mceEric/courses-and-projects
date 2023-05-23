import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function VbcUsage({ usage, handleClick, i }) {
  const items = ["Business", "Personal", "Other"];

  return (
    <div
      className="w-100 h-100 absolute border-box center-content column transition"
      style={{ transform: `translateX(${i * 100}%)` }}
    >
      <h2>What will your VBC be used for?</h2>
      {items.map((item) => {
        return (
          <button
            value={item}
            onClick={(e) => handleClick(e)}
            className={`flex row pointer small-font m-10 pointer p-10 border-box ${
              usage === item
                ? "contrasting-primary no-border white bottom-shadow"
                : "contrasting-secondary content-outline"
            }`}
            style={{
              width: "12em",
              height: "auto",
            }}
          >
            <div
              style={{
                width: "1em",
                height: "1em",
                padding: "1px",
              }}
              className={`center-content mr-5 circle ${
                usage === item ? "contrasting-secondary" : "white-bg"
              }`}
            >
              {usage === item && <FontAwesomeIcon icon={faCheck} />}
            </div>
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default VbcUsage;
