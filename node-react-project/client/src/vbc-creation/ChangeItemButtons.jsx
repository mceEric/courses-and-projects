import React from "react";

function ChangeItemButtons({ transform, usage, setTransform }) {
  return (
    <div>
      <button
        className={`absolute position-left ${transform !== 0 && "pointer"}`}
        style={{ zIndex: 100 }}
        disabled={transform === 0}
        onClick={() => setTransform(transform - 1)}
      >
        Prev
      </button>
      <button
        className={`absolute position-right ${
          transform !== 1 && usage && transform >= 0 && "pointer"
        }`}
        style={{ zIndex: 100 }}
        disabled={transform === 1 || !usage}
        onClick={() => setTransform(transform + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default ChangeItemButtons;
