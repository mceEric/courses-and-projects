import React from "react";

function ProgressBar({ transform }) {
  return (
    <div
      className="fixed flex white-bg rounded-edges top"
      style={{
        height: "1em",
        width: "70%",
        top: "2em",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="w-100 h-100 gradient-bg absolute transition rounded-edges"
        style={{
          border: "1px solid white",
          transform: `translateX(${-100.2 + transform * 100}%)`,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
