import React, { useContext } from "react";
import { Dropdown, Menu, Spin } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Logo from "../Logo";
import { useHistory } from "react-router-dom";
import { useLocations } from "../../common/hooks/useLocations";
import { Form, Input, Select, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import { SearchSalarySchema } from "../../schemas/search-salary.schema";
import { AuthContext } from "../../providers/AuthProvider";
import { occupations } from "../../source-of-truth/occupations";
import { currencies } from "../../source-of-truth/currencies";
import { SalaryContext } from "../../providers/SalaryProvider";
import { useMediaQuery } from "react-responsive";

declare global {
  interface Window {
    FB: any;
  }
}

const HeaderNavigator = () => {
  const history = useHistory();
  const locationsController = useLocations();
  const contextConsumer = useContext(AuthContext);
  const salaryContextConsumer = useContext(SalaryContext);

  const isMax1000px = useMediaQuery({ maxWidth: "1100px" });

  const dropdownMenuOptions = (
    <Menu>
      <Menu.Item onClick={() => history.push("/user/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (contextConsumer.logoutUser) {
            contextConsumer.logoutUser();
          }
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white w-full p-5 flex flex-row justify-between items-center">
      <Logo />
      {!isMax1000px && (
        <Formik
          onSubmit={(values) => {
            history.push(
              `/user/salary/results?location=${values.location}&currency=${values.currency}&occupation=${values.occupation}&page=1&limit=5`
            );
          }}
          initialValues={{
            occupation: "",
            location: "",
            currency: "",
          }}
          validationSchema={SearchSalarySchema}
        >
          <Form className="flex flex-row items-center" layout="inline">
            <Form.Item
              help={false}
              hasFeedback={false}
              className="w-72"
              name="occupation"
            >
              <Select
                showSearch
                className="capitalize"
                name="occupation"
                placeholder="Job Title or Company"
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
              className="w-52"
              name="location"
            >
              <Select
                placeholder="Location"
                name="location"
                allowClear
                notFoundContent={
                  locationsController.isLoading ? (
                    <Spin />
                  ) : !locationsController.queryLocation ? (
                    "Type for get results"
                  ) : (
                    "Any locations matched with your seach"
                  )
                }
                onSearch={(query) => {
                  locationsController.setQueryLocation(query);
                }}
                showSearch
                filterOption={false}
                options={locationsController.locations}
              />
            </Form.Item>
            <Form.Item
              help={false}
              hasFeedback={false}
              className="mt-0 w-52"
              name="currency"
            >
              <Select
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
            <SubmitButton
              loading={salaryContextConsumer.isLoading}
              type="primary"
            >
              Search
            </SubmitButton>
          </Form>
        </Formik>
      )}
      <Dropdown trigger={["click"]} overlay={dropdownMenuOptions}>
        <Avatar
          src="https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png"
          className="cursor-pointer"
        />
      </Dropdown>
    </header>
  );
};

export default HeaderNavigator;
