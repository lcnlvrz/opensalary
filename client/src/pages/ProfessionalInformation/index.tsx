import { Formik } from "formik";
import React, { Fragment } from "react";
import Header from "../../components/Header";
import { OnboardingSchema } from "../../schemas/onboarding.schema";
import { Form, Input, Radio, Select, SubmitButton } from "formik-antd";
import { useOnboarding } from "../../controllers/onboarding.controller";
import { Spin, Slider, Select as SelectAntd } from "antd";
import { workload } from "../../source-of-truth/workload";
import { useHistory } from "react-router-dom";

const ProfessionalInformation = () => {
  const controller = useOnboarding();

  const history = useHistory();

  return (
    <Fragment>
      <Header />
      <main className="py-5 items-center justify-center flex">
        <section className="bg-white p-5 text-left border-t-8 border-green-300">
          <div className="w-full flex flex-col my-5">
            <h1 className="font-bold text-2xl">Professional Information</h1>
            <p>
              {" "}
              Tell us about you for improve your experience in the platform{" "}
            </p>
          </div>
          <Formik
            onSubmit={(v) => {
              //first api call
              history.push("/user/salary/create/qualify-company");
            }}
            initialValues={{
              position: "",
              location: "",
              websiteBusiness: "",
              company: "",
              quantityEmployees: [1, 10],
              isCurrentJob: false,
              laboralSituation: "Current",
            }}
            validationSchema={OnboardingSchema}
          >
            {({ values, setFieldValue }) => (
              <Form layout="vertical">
                <Form.Item required label="Position" name="position">
                  <Select
                    filterOption={false}
                    allowClear
                    className="capitalize"
                    onSearch={(query) => controller.setQueryPosition(query)}
                    showSearch
                    loading={controller.isLoading}
                    name="position"
                    notFoundContent={
                      controller.isLoading ? (
                        <Spin />
                      ) : !controller.queryLocation ? (
                        "Type for get results"
                      ) : (
                        "Any positions matched with your seach"
                      )
                    }
                  >
                    {controller.positions.length > 0 &&
                      controller.positions.map((option) => (
                        <Select.Option
                          key={option.key}
                          className="capitalize"
                          value={option.value}
                        >
                          {option.label}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item required label="Location" name="location">
                  <Select
                    allowClear
                    notFoundContent={
                      controller.isLoading ? (
                        <Spin />
                      ) : !controller.queryLocation ? (
                        "Type for get results"
                      ) : (
                        "Any locations matched with your seach"
                      )
                    }
                    onSearch={(query) => {
                      controller.setQueryLocation(query);
                    }}
                    showSearch
                    name="location"
                    filterOption={false}
                    options={controller.locations}
                  />
                </Form.Item>
                <Form.Item required label="Company" name="company">
                  <Input name="company" />
                </Form.Item>
                <Form.Item
                  required
                  label="Company's website"
                  name="websiteBusiness"
                >
                  <Input name="websiteBusiness" />
                </Form.Item>
                <Form.Item
                  required
                  label="Quantity Employees"
                  name="quantityEmployees"
                >
                  <Slider
                    value={values.quantityEmployees as [number, number]}
                    onChange={(v: number[]) => {
                      setFieldValue("quantityEmployees", v);
                    }}
                    range={{ draggableTrack: true }}
                    defaultValue={[1, 10]}
                  />
                </Form.Item>
                <Form.Item required label="Work Load" name="workload">
                  <Select
                    options={workload.map((value, index) => ({
                      key: index,
                      label: value,
                      value,
                    }))}
                    name="workload"
                  />
                </Form.Item>
                <Form.Item
                  required
                  label="Laboral Situation"
                  name="laboralSituation"
                >
                  <Radio.Group name="laboralSituation">
                    <Radio value="Current" name="laboralSituation">
                      Current
                    </Radio>
                    <Radio value="Previous" name="laboralSituation">
                      Previous
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <SubmitButton> Continue </SubmitButton>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    </Fragment>
  );
};

export default ProfessionalInformation;
