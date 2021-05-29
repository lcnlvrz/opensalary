import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import React from "react";
import OpenSalaryLogo from "../../assets/open-salary.png";

const Footer = () => {
  return (
    <footer className="bg-gray-600 p-5 text-white flex flex-col space-y-3">
      <div className="flex flex-row items-center space-x-5">
        <img
          style={{ filter: "invert(1)" }}
          className="w-32 object-contain"
          src={OpenSalaryLogo}
        />
        <a target="_blank" href="https://github.com/lcnlvrz">
          <GithubOutlined className="text-lg" />
        </a>
        <a target="_blank" href="https://linkedin.com/in/luciano-alvarez">
          <LinkedinOutlined className="text-lg" />
        </a>
      </div>
      <p className="text-left font-light">
        Open salary is an MVP application created by Luciano Alvarez with the
        objective to contribute for more fair salaries in job market.
        <br />
        You can post and search salaries to be part of this mission.
      </p>
    </footer>
  );
};

export default Footer;
