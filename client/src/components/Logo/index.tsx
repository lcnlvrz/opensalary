import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import OpenSalaryLogo from "../../assets/open-salary.png";

const Logo = () => {
  return (
    <div>
      <Link to="/user/home">
        <img className="w-32 object-contain" src={OpenSalaryLogo} />
      </Link>
    </div>
  );
};

export default Logo;
