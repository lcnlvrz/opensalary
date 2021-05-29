import React, { Fragment } from "react";
import Header from "../../components/Header";
import { Form, Input, Rate, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import { QualifyCompanySchema } from "../../schemas/qualify-company.schema";
import { useHistory } from "react-router-dom";

const QualifyCompany = () => {
  const history = useHistory();

  return (
    <Fragment>
      <Header />
      <main className="py-5 items-center justify-center flex">
        <section className="bg-white p-5 text-left border-t-8 border-green-300">
          <div className="w-full flex flex-col my-5">
            <h1 className="font-bold text-2xl">Qualify Company</h1>
            <p>Your answers will help another persons to find a job</p>
          </div>
          <Formik
            validationSchema={QualifyCompanySchema}
            initialValues={{
              rate: 0,
              title: "",
              advantages: "",
              disadvantages: "",
            }}
            onSubmit={(v) => {
              //call api first and then..
              history.push("/user/salary/create/thanks-message");
            }}
          >
            <Form layout="vertical">
              <h2 className="font-semibold text-lg">
                {" "}
                Give a qualification to the company{" "}
              </h2>
              <Form.Item name="rate">
                <Rate allowHalf name="rate" />
              </Form.Item>
              <Form.Item required label="Advantages" name="advantages">
                <Input.TextArea
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  name="advantages"
                />
              </Form.Item>
              <Form.Item required label="Disadvantages" name="disadvantages">
                <Input.TextArea
                  autoSize={{ minRows: 5, maxRows: 5 }}
                  name="disadvantages"
                />
              </Form.Item>
              <SubmitButton> Send Evaluation </SubmitButton>
            </Form>
          </Formik>
        </section>
      </main>
    </Fragment>
  );
};

export default QualifyCompany;
