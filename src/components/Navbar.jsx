import React from "react";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  return (
    <div>
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button className="">Logout</button>
    </div>
  );
};

export default Navbar;
