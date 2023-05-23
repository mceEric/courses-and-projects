import React from "react";
import Hero from "../components/Hero";
import Mountains from "../components/mountains/Mountains";

function work() {
  const heading = "Our mountains";
  const message =
    "This is some of the greatest mountains around the world.";

  return (
    <div>
      <Hero heading={heading} message={message} />
      <Mountains />
    </div>
  );
}

export default work;
