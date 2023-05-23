import React from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

function Instagramming({ socialImg }) {
  return (
    <div className="relative cursor-pointer">
      <Image
        className="w-full h-full"
        layout="responsive"
        src={socialImg}
        alt="/"
        width="1440"
        height="600"
        objectFit="cover"
      />
      <div className="flex transition-all justify-center items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-black/50 group">
        <p className="text-gray-300 hidden group-hover:block">
          <FaInstagram size={30} />
        </p>
      </div>
    </div>
  );
}

export default Instagramming;
