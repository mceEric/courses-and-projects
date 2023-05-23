import React from "react";
import { SliderData } from "../../SliderData";
import Instagramming from "./Instagramming";

function Instagram() {
  return (
    <div className="max-w-[1240px] mx-auto text-center py-24">
      <p className="text-2xl font-bold">Follow us on Instagram</p>
      <p className="pb-4">Mountain</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-4">
        {SliderData.map((slide) => {
          return <Instagramming socialImg={slide.image} />;
        })}
      </div>
    </div>
  );
}

export default Instagram;
