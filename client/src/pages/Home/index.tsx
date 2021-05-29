import React from "react";
import HeaderNavigator from "../../components/HeaderNavigator";
import { SearchOutlined } from "@ant-design/icons";
import { Form, Select, SubmitButton } from "formik-antd";
import { Input as InputAntd, Button, Spin } from "antd";
import { Formik } from "formik";
import { SearchSalarySchema } from "../../schemas/search-salary.schema";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { occupations } from "../../source-of-truth/occupations";
import { currencies } from "../../source-of-truth/currencies";
import { useHome } from "../../controllers/home.controller";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const controller = useHome();

  const isMax800px = useMediaQuery({ maxWidth: "800px" });
  const isMax500px = useMediaQuery({ maxWidth: "500px" });

  return (
    <div className="w-full">
      <HeaderNavigator />
      <nav className="px-5 pt-5 bg-gray-100">
        <ul className="w-full space-x-10 font-semibold  flex flex-row items-start">
          <li className="border-b-4 border-green-500 pb-3">Search Salaries</li>
          <Link to="/user/salary/create">
            <li className="font-semibold border-b-4 border-gray-400 pb-3 border-opacity-0 hover:border-opacity-100 text-gray-400  hover:text-black transition-all cursor-pointer">
              Add Salary
            </li>
          </Link>
        </ul>
      </nav>
      <div className="flex flex-col bg-white ">
        <main className="w-full flex flex-col  ">
          <section style={{ height: "30rem" }} className="relative">
            <div className="absolute flex-col space-y-10 w-full h-full flex items-center justify-center">
              <div
                style={{ width: isMax800px ? "100%" : "50rem" }}
                className="bg-black  flex flex-col space-y-5 bg-opacity-70 p-5"
              >
                <h1 className="font-bold text-2xl  text-center text-white">
                  Search Salaries and Compensation
                </h1>
                <Formik
                  validationSchema={SearchSalarySchema}
                  onSubmit={(values) => {
                    controller.history.push(
                      `/user/salary/results?location=${values.location}&currency=${values.currency}&occupation=${values.occupation}&page=1&limit=5`
                    );
                  }}
                  initialValues={{ occupation: "", location: "", currency: "" }}
                >
                  <Form className="w-full" layout="inline">
                    <InputAntd.Group
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: isMax500px ? "column" : "row",
                      }}
                      className="text-left w-full"
                      compact
                    >
                      <Form.Item
                        help={false}
                        hasFeedback={false}
                        name="occupation"
                        style={{
                          border: 0,
                          width: isMax500px ? "100%" : "30%",
                        }}
                      >
                        <Select
                          showSearch
                          className="capitalize"
                          name="occupation"
                          placeholder="Job Title or Company"
                          size="large"
                        >
                          {occupations.map((occupation, index) => (
                            <Select.Option
                              className="capitalize"
                              value={occupation}
                              key={index}
                            >
                              {occupation}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        help={false}
                        hasFeedback={false}
                        className="w-1/2"
                        name="location"
                        style={{
                          border: 0,
                          width: isMax500px ? "100%" : "30%",
                        }}
                      >
                        <Select
                          placeholder="Location"
                          size="large"
                          name="location"
                          allowClear
                          notFoundContent={
                            controller.locationsController.isLoading ? (
                              <Spin />
                            ) : !controller.locationsController
                                .queryLocation ? (
                              "Type for get results"
                            ) : (
                              "Any locations matched with your seach"
                            )
                          }
                          onSearch={(query) => {
                            controller.locationsController.setQueryLocation(
                              query
                            );
                          }}
                          showSearch
                          filterOption={false}
                          options={controller.locationsController.locations}
                        />
                      </Form.Item>
                      <Form.Item
                        style={{ width: isMax500px ? "100%" : "30%" }}
                        className="mt-0"
                        name="currency"
                      >
                        <Select
                          size="large"
                          placeholder="Currency"
                          showSearch
                          allowClear
                          defaultActiveFirstOption
                          name="currency"
                          options={currencies.map((config, index) => ({
                            key: index,
                            label: `${config.name} (${config.code})`,
                            value: config.code,
                          }))}
                        />
                      </Form.Item>
                      {isMax500px ? (
                        <SubmitButton
                          style={{ margin: "0.5rem 0", width: "100%" }}
                        >
                          Search
                        </SubmitButton>
                      ) : (
                        <SubmitButton
                          loading={controller.contextConsumer.isLoading}
                          style={{ border: 0 }}
                          size="large"
                          className="h-full bg-green-600 border-0 text-white font-semibold"
                          icon={<SearchOutlined />}
                        />
                      )}
                    </InputAntd.Group>
                  </Form>
                </Formik>
              </div>
            </div>
            <img
              style={{ height: "30rem" }}
              className="w-full object-cover object-top"
              src="https://image.freepik.com/free-photo/creative-male-employer-does-remote-work-cafe-interior-dressed-casually-downloads-files-from-internet-laptop-computer-surrounded-with-papers-has-successful-career-eats-cafeteria_273609-29641.jpg"
            />
          </section>
          <article
            style={{ flexWrap: isMax800px ? "wrap-reverse" : "inherit" }}
            className="p-5 bg-white w-full gap-10 flex items-center flex-row justify-between"
          >
            <div
              style={{ width: isMax800px ? "100%" : "50%" }}
              className=" text-left flex flex-col items-start space-y-5"
            >
              <h2 className="font-semibold text-left text-3xl">
                Search Salaries and Contribute.
              </h2>
              <p className="text-lg">
                Search a salaries and compensation at thousands of companies.
                <br />
                Find out if you’re paid fairly. Share your salary anonymously to
                help others.
              </p>
              <Link className="w-full" to="/user/salary/create">
                <Button
                  className="bg-green-500 w-full border-0 font-semibold"
                  size="large"
                  type="primary"
                >
                  Share your pay
                </Button>
              </Link>
            </div>
            <div
              className="text-center"
              style={{ width: isMax800px ? "100%" : "50%" }}
            >
              <img src="https://media.glassdoor.com/home/value-prop/sal/value-prop-carousel-desk-GB.png" />
            </div>
          </article>
          <article
            style={{ flexWrap: isMax800px ? "wrap" : "inherit" }}
            className="p-5 bg-white w-full gap-10 flex items-center flex-row justify-between"
          >
            <div
              className="text-center"
              style={{ width: isMax800px ? "100%" : "50%" }}
            >
              <img src="https://image.freepik.com/free-vector/male-female-avatars_1048-965.jpg" />
            </div>
            <div
              style={{ width: isMax800px ? "100%" : "50%" }}
              className=" text-left flex flex-col items-start space-y-5"
            >
              <h2 className="font-semibold text-left text-3xl">
                Don't be afraid
              </h2>
              <p className="text-lg">
                Your salaries post is always as anonymous person. Nobody knows
                who you are
              </p>
              <Link className="w-full" to="/user/profile">
                <Button
                  className="bg-green-500 w-full border-0 font-semibold"
                  size="large"
                  type="primary"
                >
                  See my salaries posts
                </Button>
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
