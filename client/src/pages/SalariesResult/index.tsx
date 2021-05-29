import {
  BarChartOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import React, { Fragment, useState } from "react";
import HeaderNavigator from "../../components/HeaderNavigator";
import { Bar, defaults } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { Button, Form, Input, Spin, Table, Tooltip } from "antd";
import Footer from "../../components/Footer";
import { useSalariesResult } from "../../controllers/salaries-result.controller";
import moment from "moment";
import { ConfidenceResult } from "../../types/confidence-result.type";
import Header from "../../components/Header";
import { useMediaQuery } from "react-responsive";

const SalariesResult = () => {
  const controller = useSalariesResult();

  const max1100px = useMediaQuery({ maxWidth: "1100px" });

  const max800 = useMediaQuery({ maxWidth: "800px" });

  defaults.responsive = true;
  const [ellipsis, setEllipsis] = useState<boolean>(false);

  const data: ChartData = {
    labels: ["Low Salary", "Average Salary", "High Salary"],
    datasets: [
      {
        fill: true,
        data: [
          controller.contextConsumer.salariesResult?.lowerSalary || 0,
          controller.contextConsumer.salariesResult?.averageBasePay || 1,
          controller.contextConsumer.salariesResult?.higherSalary || 2,
        ],
        backgroundColor: ["rgb(0, 172, 100)"],
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: {
        display: false,
      },
      yAxes: {
        ticks: {
          callback: (tick) => `$${tick}`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (controller.contextConsumer.isLoading)
    return (
      <div className="h-screen flex items-center justify-center w-full">
        <Spin />
      </div>
    );

  if (!controller.contextConsumer.salariesResult)
    return (
      <Fragment>
        <HeaderNavigator />
        <main className="w-full py-5 px-14 flex flex-col space-y-10">
          <section className="bg-white shadow-lg p-5 text-left flex flex-col space-y-5">
            <h1>Your search didn't match with any results</h1>
          </section>
        </main>
      </Fragment>
    );

  return (
    <Fragment>
      <Header />
      <main
        className={`w-full py-5 ${
          max800 ? "p-0" : "px-14"
        }  flex flex-col space-y-10`}
      >
        <section className="bg-white shadow-lg p-5 text-left flex flex-col space-y-5">
          <div
            style={{
              flexDirection: max800 ? "column" : "row",
              justifyContent: max800 ? "flex-start" : "space-between",
              alignItems: max800 ? "flex-start" : "center",
            }}
            className="w-full flex items-center justify-between gap-5"
          >
            <div className="w-full flex flex-col space-y-2">
              <h2 className="text-black font-semibold text-2xl">
                {controller.contextConsumer.salariesResult.occupation} Salaries
                in {controller.contextConsumer.salariesResult.location}
              </h2>
              <div className="w-full flex flex-row text-xs space-x-3">
                <p>
                  {controller.contextConsumer.salariesResult.quantitySalaries}
                  {controller.contextConsumer.salariesResult.quantitySalaries >
                  1
                    ? " salaries"
                    : " salary"}
                </p>
                <p>
                  Updated{" "}
                  {moment(
                    controller.contextConsumer.salariesResult.lastUpdate
                  ).format("ll")}
                </p>
              </div>
            </div>
            {controller.contextConsumer.salariesResult?.confidenceResult ===
            ConfidenceResult.HIGH_CONFIDENCE ? (
              <div className="flex justify-start flex-row space-x-2 items-start">
                <BarChartOutlined className="text-3xl text-green-500 " />
                <Tooltip
                  color="green"
                  arrowContent
                  title="High confidence means that this position has enough data to expose a valid average"
                >
                  <p className="m-0 leading-4 cursor-pointer font-light">
                    <span className="font-bold text-green-500 ">High</span>
                    <br />
                    Confidence
                  </p>
                </Tooltip>
              </div>
            ) : controller.contextConsumer.salariesResult?.confidenceResult ===
              ConfidenceResult.MEDIUM_CONFIDENCE ? (
              <div className="flex justify-start flex-row space-x-2 items-start">
                <BarChartOutlined className="text-3xl text-yellow-500 " />
                <Tooltip
                  color="orange"
                  arrowContent
                  title="Medium confidence means that this position has many information but it doesn't enough to provide a real result"
                >
                  <p className="m-0 leading-4 cursor-pointer font-light">
                    <span className="font-bold text-yellow-500 ">Medium</span>
                    <br />
                    Confidence
                  </p>
                </Tooltip>
              </div>
            ) : (
              <div className="flex justify-start flex-row space-x-2 items-start">
                <BarChartOutlined className="text-3xl text-red-500 " />
                <Tooltip
                  color="red"
                  arrowContent
                  title="Low confidence means that this position has not enough information and the result could be not the real salary average"
                >
                  <p className="m-0 leading-4 cursor-pointer font-light">
                    <span className="font-bold text-red-500 ">Low</span>
                    <br />
                    Confidence
                  </p>
                </Tooltip>
              </div>
            )}
          </div>
          <div
            style={{ flexDirection: max1100px ? "column" : "row" }}
            className="w-full flex items-start justify-evenly flex-row gap-5"
          >
            <div className="flex flex-col space-y-5">
              <h2 className="text-lg">
                Average Base Pay
                <br />
                <span className="text-3xl font-semibold">
                  {" "}
                  {controller.contextConsumer.salariesResult.currency}$
                  {controller.contextConsumer.salariesResult.averageBasePay} /
                  mo
                </span>
              </h2>
              <div className="flex space-x-5 flex-row items-center">
                <div className="flex text-red-500 flex-row items-center ">
                  <CaretDownOutlined />
                  <p>
                    ${controller.contextConsumer.salariesResult.lowerSalary} LOW
                  </p>
                </div>
                <div className="flex text-green-500 flex-row items-center">
                  <CaretUpOutlined />
                  <p>
                    ${controller.contextConsumer.salariesResult.higherSalary}{" "}
                    HIGH
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{ width: max800 ? "100%" : "45vw" }}
              className="relative"
            >
              <Bar type="bar" data={data} options={options} />
            </div>
            <div style={{ width: max1100px ? "100%" : "25%" }}>
              <h4 className="font-semibold text-gray-400">
                How much does a{" "}
                {controller.contextConsumer.salariesResult.occupation} make in{" "}
                {controller.contextConsumer.salariesResult.location}?
              </h4>
              <p className="text-gray-400">
                The average salary for a{" "}
                {controller.contextConsumer.salariesResult.occupation} is $
                {controller.contextConsumer.salariesResult.averageBasePay} in{" "}
                {controller.contextConsumer.salariesResult.location}. Salaries
                estimates are based on{" "}
                {controller.contextConsumer.salariesResult.quantitySalaries}{" "}
                salaries submitted anonymously to OpenSalary by{" "}
                {controller.contextConsumer.salariesResult.occupation} employees
                in
                {controller.contextConsumer.salariesResult.location}
              </p>
            </div>
          </div>
        </section>
        <section
          style={{ width: max800 ? "100%" : "70%" }}
          className="bg-white shadow-lg p-5 text-left flex flex-col space-y-5"
        >
          <p className="m-0 font-semibold text-lg">
            {controller.contextConsumer.salariesResult.occupation} salaries in{" "}
            {controller.contextConsumer.salariesResult.location}
          </p>
          <Form className="flex flex-row items-center">
            <Form.Item className="m-0">
              <Input
                onChange={(e) =>
                  controller.setQueryCompany({
                    touched: true,
                    value: e.target.value,
                  })
                }
                size="large"
                placeholder="Company"
              />
            </Form.Item>
            <Button size="large" type="primary">
              Search
            </Button>
          </Form>
          <Table
            loading={controller.contextConsumer.isLoadingPagination}
            onChange={(pagination, filters) => {
              if (
                controller.contextConsumer.getParams &&
                controller.contextConsumer.updateSalariesPagination
              ) {
                const params = controller.contextConsumer.getParams();
                if (!params) return;
                controller.contextConsumer.updateSalariesPagination(
                  params.location,
                  params.occupation,
                  params.currency,
                  pagination.current || 1,
                  controller.queryCompany.value
                );
              }
            }}
            pagination={{
              position: ["bottomCenter"],
              current:
                controller.contextConsumer.salariesResult.meta.currentPage,
              pageSize: 5,
              total: controller.contextConsumer.salariesResult.meta.totalItems,
            }}
            dataSource={
              controller.contextConsumer.salariesResult
                ? controller.contextConsumer.salariesResult.salaries.map(
                    (salary, index) => ({
                      ...salary,
                      key: index,
                    })
                  )
                : []
            }
            columns={[
              {
                dataIndex: "company",
                title: "Company",
                key: "company",
                render: (value, record) => {
                  return (
                    <div className="flex flex-col items-start">
                      <p className="text-blue-500">{record.occupation}</p>
                      <p>{record.company}</p>
                      <p>{moment(record.createdAt).format("ll")}</p>
                    </div>
                  );
                },
              },
              {
                dataIndex: "amount",
                key: "amount",
                render: (v, r) => (
                  <div className="flex flex-col">
                    <div className="h-1 rounded-full bg-gradient-to-r from-red-500 to-green-400 w-full" />
                    <div className="w-full flex flex-row justify-center items-center">
                      <p className="font-light text-center">
                        {controller.contextConsumer.salariesResult?.currency ||
                          ""}
                        ${r.amount} monthly
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default SalariesResult;
