import { Button } from "antd";
import React, { Fragment } from "react";
import Header from "../../components/Header";

const EmailValidation = () => {
  return (
    <Fragment>
      <Header />
      <main className="py-5 items-center justify-center flex">
        <section className="bg-white p-5 border-t-8 border-green-300 text-left">
          <div className="w-full flex flex-col my-5">
            <h1 className="font-bold text-2xl">
              Thanks for your contribution!
            </h1>
            <p className="font-normal">
              There is only one step left to finish your register
            </p>
          </div>
          <div className="w-full text-center items-center justify-center flex">
            <img
              className="h-60 object-cover"
              src="https://image.freepik.com/free-vector/decentralized-application-abstract-concept-illustration_335657-3888.jpg"
            />
          </div>

          <p className="font-normal">
            We sent you an validation email to{" "}
            <span className="font-semibold">luciano@gmail.com</span>.
            <br /> Let's click on the link bellow to verify if you aren't a
            robot
          </p>
          <div className="w-full flex space-y-3 my-5 flex-col items-center justify-center">
            <Button className="w-full font-semibold">
              Send mail validation again
            </Button>
            <Button className="w-full font-semibold" type="primary">
              Done
            </Button>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default EmailValidation;
