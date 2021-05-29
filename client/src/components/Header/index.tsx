import React from "react";
import Logo from "../Logo";

const Header = () => {
  return (
    <header
      style={{ height: "10vh" }}
      className="w-full bg-white flex p-4 items-center"
    >
      <Logo />
    </header>
  );
};

export default Header;
