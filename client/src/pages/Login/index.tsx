import React from "react";
import { Divider } from "antd";
import { Formik } from "formik";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Form, Input, SubmitButton } from "formik-antd";
import { LoginSchema } from "../../schemas/login.schema";
import {
  BarChartOutlined,
  FacebookFilled,
  GoogleOutlined,
  KeyOutlined,
  MailOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import { IFacebook } from "../../types/facebook.type";
import { IGoogle } from "../../types/google.type";
import { useLogin } from "../../controllers/login.controller";
import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header";
import { FaHandsHelping } from "react-icons/fa";
import { RiFolderUnknowLine } from "react-icons/ri";

const Login = () => {
  const controller = useLogin();

  const isMax600px = useMediaQuery({
    maxWidth: "600px",
  });

  return (
    <main className="w-full flex flex-col space-y-16 items-center justify-center">
      <Header />
      <section className="bg-white p-5 text-center">
        <h1
          style={{
            marginBottom: !isMax600px ? "15px" : "20px",
            fontSize: isMax600px ? "2rem" : "2.25rem",
          }}
          className="font-semibold text-center  text-black "
        >
          Contribute for more fair salaries
        </h1>
        <div className="w-full flex-wrap justify-center flex flex-row items-center">
          <div
            style={{ width: isMax600px ? "100%" : "18rem" }}
            className="shadow-2xl "
          >
            <FacebookLogin
              size="metro"
              containerStyle={{
                width: isMax600px ? "100%" : "18rem",
              }}
              buttonStyle={{
                display: "flex",
                alignItems: "center",
                fontSize: "0.9rem",
                fontWeight: 600,
                width: isMax600px ? "100%" : "18rem",
                height: "2rem",
                padding: "1.25rem",
                justifyContent: "space-between",
              }}
              icon={<FacebookFilled style={{ fontSize: "1.5rem" }} />}
              textButton="CONTINUE WITH FACEBOOK"
              appId={
                process.env.REACT_APP_FACEBOOK_APP_ID || "1088597931155576"
              }
              autoLoad={true}
              fields="name,email,picture"
              callback={(userInfo: IFacebook) => {
                if (userInfo.status !== "unknown") {
                  controller.authenticateUserAPI({
                    email: userInfo.email,
                    externalId: userInfo.userID,
                    name: userInfo.name,
                    picture: userInfo.picture.data.url,
                  });
                }
              }}
            />
          </div>
          <GoogleLogin
            render={(props) => (
              <button
                style={{
                  width: isMax600px ? "100%" : "18rem",
                  height: "2.7rem",
                }}
                className=" flex justify-between bg-white shadow-2xl flex-row items-center p-5 "
                disabled={props.disabled}
                onClick={props.onClick}
              >
                <GoogleOutlined style={{ fontSize: "1.3rem" }} />
                <p
                  style={{ fontSize: "1rem" }}
                  className="m-0 font-semibold font-sans"
                >
                  {" "}
                  CONTINUE WITH GOOGLE{" "}
                </p>
              </button>
            )}
            style={{
              width: "25rem",
              height: "2rem",
            }}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
            onSuccess={(res: any) => {
              const resTyped = { ...res } as IGoogle;
              controller.authenticateUserAPI({
                name: resTyped.profileObj.name,
                email: resTyped.profileObj.email,
                picture: resTyped.profileObj.imageUrl,
                externalId: resTyped.profileObj.googleId,
              });
            }}
            cookiePolicy={"single_host_origin"}
          >
            <span className="font-normal text-lg">Login with Google</span>
          </GoogleLogin>
        </div>
        <Divider style={{ color: "black", borderColor: "black" }}>OR</Divider>
        <Formik
          onSubmit={(values) =>
            controller.registerUserLocal(
              values.email,
              values.password,
              values.name
            )
          }
          initialValues={{
            email: "",
            password: "",
            name: "",
          }}
          validationSchema={LoginSchema}
        >
          <Form className="text-left flex flex-col">
            <Form.Item name="email">
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="Email"
                name="email"
              />
            </Form.Item>
            <Form.Item name="name">
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder="Full Name"
                name="name"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                size="large"
                prefix={<KeyOutlined />}
                placeholder="Password"
                name="password"
              />
            </Form.Item>
            <div className="w-full flex text-center items-center justify-center">
              <SubmitButton loading={controller.isLoading} size="large">
                {" "}
                Continue with email{" "}
              </SubmitButton>
            </div>
          </Form>
        </Formik>
      </section>
      <section className="w-full border-t-8 border-green-500 p-5 space-y-16 text-center bg-white items-center justify-center flex flex-col ">
        <article className="w-full flex flex-col space-y-5">
          <h2 className="font-semibold text-black text-3xl">
            What is Open Salary?
          </h2>
          <p className="text-lg">
            {" "}
            Open Salary is a free platform created by Luciano Alvarez with the
            objective of recollecting data to make salaries more fair. Here you
            can post job salaries as anonymous and find salaries by position,
            location and currency.
          </p>
        </article>
        <article className="w-full flex flex-col space-y-5">
          <h2 className="font-semibold text-black text-3xl">
            How OpenSalary Works for You?
          </h2>
          <ul className="w-full flex-wrap flex text-black flex-row justify-evenly gap-10">
            <li className="flex  flex-col items-center justify-center">
              <SearchOutlined className="text-8xl text-green-500" />
              <h3 className="text-lg font-semibold">Search salaries</h3>
            </li>
            <li className="flex flex-col items-center justify-center">
              <FaHandsHelping className="text-8xl text-green-500" />
              <h3 className="text-lg font-semibold">
                Contribute posting a salary
              </h3>
            </li>
            <li className="flex flex-col items-center justify-center">
              <RiFolderUnknowLine className="text-8xl text-green-500" />
              <h3 className="text-lg font-semibold">
                Anonymous author and confidence
              </h3>
            </li>
            <li className="flex flex-col items-center justify-center">
              <BarChartOutlined className="text-8xl text-green-500" />
              <h3 className="text-lg font-semibold">Statitics and Charts</h3>
            </li>
          </ul>
        </article>
        <article className="w-full flex flex-col space-y-5">
          <h2 className="font-semibold text-black text-3xl">
            Would you like contribute as developer?
          </h2>
          <p className="text-lg">
            This project is open source, you can go to the repository clicking
            the following link:
            <br />
            <a
              className="text-lg font-semibold"
              target="_blank"
              href="https://github.com/lcnlvrz/opensalary"
            >
              Open Salary Source Code
            </a>
          </p>
        </article>
      </section>
    </main>
  );
};

export default Login;
