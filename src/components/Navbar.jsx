import React from "react";

function Navbar() {
  return (
    <nav>
      <div className="flex py-3 flex-wrap justify-around">
        <h1 className=" text-lg font-bold ">Todo App </h1>
        <ul className="flex gap-[40px] text-m">
          <li>Home</li>
          <li>About</li>
          <li>Product</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
