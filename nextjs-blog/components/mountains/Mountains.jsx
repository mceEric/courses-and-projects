import React from "react";
import Image from "next/image";
import { MountainData } from "./MountainData";
function Mountains() {
  return (
    <div className="max-w-[1240px] mx-auto py-16 text-center">
      <h1 className="font-bold text-2xl p-4">Mountain Photos</h1>
      <div className="grid grid-rows-none md:grid-cols-5 p-4 gap-4">
        {MountainData.map((img, index) => {
          if (index === 0) {
            return (
              <div className="w-full h-full col-span-2 md:col-span-3 row-span-2">
                <Image
                  src={img.image}
                  alt="/"
                  layout="responsive"
                  width="677"
                  height="451"
                />
              </div>
            );
          }
          return (
            <div className="w-full h-full">
              <Image
                src={img.image}
                alt="/"
                layout="responsive"
                width="215"
                height="217"
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Mountains;
