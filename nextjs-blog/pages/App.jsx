import React from "react";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import { SliderData } from "../components/SliderData";
import Instagram from "../components/socials/instagram/Instagram";

function App() {
  const heading = "Mountains";
  const message =
    "This is a website which contains various images of mountainous terrain.";
  return (
    <div>
      <Hero heading={heading} message={message} />
      <Slider slides={SliderData} />
      <Instagram />
    </div>
  );
}

export default App;
