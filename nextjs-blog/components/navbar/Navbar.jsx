import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    function changeColor() {
      if (window.scrollY >= 90) {
        setColor("white");
        setTextColor("black");
      } else {
        setColor("transparent");
        setTextColor("white");
      }
    }
    window.addEventListener("scroll", changeColor);
  }, []);

  const links = [
    { name: "Home" },
    { name: "Gallery" },
    { name: "Work" },
    { name: "Contact" },
  ];

  function handleNav() {
    setNav(!nav);
  }

  function uncapitalize(string) {
    if (string === "Gallery") {
      return "#" + string.toLowerCase();
    } else if (string === "Home") {
      return "/";
    }
    return string.toLowerCase();
  }
  return (
    <div
      style={{ background: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-7xl m-auto flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl">
            Mountain
          </h1>
        </Link>
        <ul className="hidden sm:flex ">
          {links.map((link) => {
            return (
              <li style={{ color: `${textColor}` }} className="p-4">
                <Link href={`/${uncapitalize(link.name)}`}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        <div
          className={`sm:hidden absolute top-0 right-0 bottom-0 flec justify-center items-center w-full h-screen bg-black text-center ease-in duration-300 ${
            nav ? "left-0" : "left-[-100%]"
          }`}
        >
          <ul>
            {links.map((link) => {
              return (
                <li
                  onClick={handleNav}
                  className="p-4 text-4xl hover:text-gray-500"
                >
                  <Link href={`/${uncapitalize(link.name)}`}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
