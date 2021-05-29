import { Formik } from "formik";
import React, { Fragment } from "react";
import Header from "../../components/Header";
import { Form, Input, InputNumber, Select, SubmitButton } from "formik-antd";
import { Input as InputAntd, Spin } from "antd";
import { currencies } from "../../source-of-truth/currencies";
import { SalarySchema } from "../../schemas/salary.schema";
import { useAddSalary } from "../../controllers/add-salary.controller";
import { JobInterval } from "../../types/salary.type";
import { occupations } from "../../source-of-truth/occupations";

const AddSalary = () => {
  const controller = useAddSalary();
  return (
    <Fragment>
      <Header />
      <main className="py-5 items-center justify-center flex">
        <section className="bg-white w-96 p-5 text-left border-t-8 border-green-300">
          <div className="w-full flex flex-col my-5">
            <h1 className="font-bold text-2xl">Add salary</h1>
            <p>Fill out the following form for contribute</p>
          </div>
          <Formik
            validationSchema={SalarySchema}
            onSubmit={(values) => controller.createSalary(values)}
            initialValues={{
              amount: 500,
              interval: JobInterval.PER_HOUR,
              currency: "ARS",
              location: "",
              yearsOfExperience: 1,
              occupation: "",
              company: "",
            }}
          >
            <Form layout="vertical">
              <Form.Item required label="Position" name="occupation">
                <Select
                  showSearch
                  name="occupation"
                  options={occupations.map((occupation, index) => ({
                    value: occupation,
                    label: occupation,
                    key: index,
                  }))}
                />
              </Form.Item>
              <InputAntd.Group className="border-0 w-full " compact>
                <Form.Item
                  style={{ border: 0 }}
                  className="border-0 w-1/2 mb-2"
                  required
                  label="Amount"
                  name="amount"
                >
                  <InputNumber className="w-full" name="amount" />
                </Form.Item>
                <Form.Item
                  style={{ border: 0 }}
                  className="border-0 w-1/2 mb-2"
                  label={<span className="opacity-0">Interval</span>}
                  name="interval"
                >
                  <Select
                    loading={controller.locationsController.isLoading}
                    className="border-0"
                    defaultActiveFirstOption
                    options={Object.values(JobInterval).map(
                      (interval, index) => ({
                        value: interval,
                        key: index,
                        label: interval,
                      })
                    )}
                    name="interval"
                  />
                </Form.Item>
              </InputAntd.Group>
              <Form.Item className="mt-0" name="currency">
                <Select
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
              <Form.Item
                required
                className="w-full"
                label="Years of Experience"
                name="yearsOfExperience"
              >
                <InputNumber
                  min={1}
                  className="w-full"
                  name="yearsOfExperience"
                />
              </Form.Item>
              <Form.Item required name="location" label="Location">
                <Select
                  allowClear
                  notFoundContent={
                    controller.locationsController.isLoading ? (
                      <Spin />
                    ) : !controller.locationsController.queryLocation ? (
                      "Type for get results"
                    ) : (
                      "Any locations matched with your seach"
                    )
                  }
                  onSearch={(query) => {
                    controller.locationsController.setQueryLocation(query);
                  }}
                  showSearch
                  name="location"
                  filterOption={false}
                  options={controller.locationsController.locations}
                />
              </Form.Item>
              <Form.Item label="Company" required name="company">
                <Input name="company" />
              </Form.Item>
              <SubmitButton loading={controller.isLoading}>
                {" "}
                Send Salary{" "}
              </SubmitButton>
            </Form>
          </Formik>
        </section>
      </main>
    </Fragment>
  );
};

export default AddSalary;
