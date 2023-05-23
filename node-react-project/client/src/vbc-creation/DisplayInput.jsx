import React, { useState } from "react";

function DisplayInput({ name, handler }) {
  const [value, setValue] = useState("");

  return (
    <div className="flex row">
      <input
        className="no-border rounded-edges border-box p-10 m-10 normal-font bottom-shadow"
        type="text"
        onChange={(e) => handler(e.target.value)}
        placeholder={name}
        required
      />
    </div>
  );
}

export default DisplayInput;
