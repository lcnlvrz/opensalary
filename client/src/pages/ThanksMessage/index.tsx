import { Button, Divider } from "antd";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const ThanksMessage = () => {
  return (
    <Fragment>
      <Header />
      <main className="w-full flex items-center justify-center p-5">
        <div className="bg-white border-t-4 border-green-300 p-5 flex-col flex items-center justify-center">
          <h1 className="text-2xl font-semibold">
            You contributed for more fair salaries!
          </h1>
          <img
            className="w-60"
            src="https://image.freepik.com/free-vector/super-thank-you-concept-illustration_114360-1529.jpg"
          />
          <div className="text-center">
            <Link to="/user/salary/create">
              <Button size="large" type="primary">
                Add new salary
              </Button>
            </Link>
            <Divider style={{ color: "black", borderColor: "black" }}>
              OR
            </Divider>
            <Link to="/user/home">
              <Button>Back Home</Button>
            </Link>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ThanksMessage;
