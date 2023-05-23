import React, { useState } from "react";
import DisplayInput from "./DisplayInput";

function VbcCreation() {
  const [hover, setHover] = useState(false);
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const items = [
    { name: "Title", handler: setTitle },
    { name: "Field", handler: setField },
    { name: "Description", handler: setDescription },
    { name: "Phone number", handler: setNumber },
    { name: "Email", handler: setEmail },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/vbc/:vbcId/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title,
        field: field,
        description: description,
        phoneNumber: number,
        email: email,
      }),
    });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="full-screen center-content column"
    >
      <div className="vbc-display p-20 border-box gradient-bg center-content column">
        {items.map((item) => {
          return <DisplayInput name={item.name} handler={item.handler} />;
        })}
      </div>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`tube-edges p-10 white bottom-shadow mt-10 pointer alt-content-outline ${
          !hover ? "component-gradient" : "alt-component-gradient white"
        }`}
      >
        Generate VBC Template
      </button>
    </form>
  );
}

export default VbcCreation;

//JWT on client side from server to create vbc
