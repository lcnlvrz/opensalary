import { Button, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import HeaderNavigator from "../../components/HeaderNavigator";
import { useProfile } from "../../controllers/profile.controller";
import moment from "moment";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
  const controller = useProfile();

  const isMax800px = useMediaQuery({ maxWidth: "800px" });

  if (controller.contextConsumer.isLoadingOwnSalaries)
    return (
      <div className="p-5 h-screen w-full flex items-center justify-center">
        <Spin />
      </div>
    );

  return (
    <div>
      <HeaderNavigator />
      <main className="p-5">
        <section className="bg-white p-5 text-left">
          <h2 className="font-semibold text-2xl">Your Profile Dashboard</h2>
          <section
            style={{ flexDirection: isMax800px ? "column" : "row" }}
            className="flex space-x-10 flex-row items-start justify-between"
          >
            <div
              style={{ width: isMax800px ? "100%" : "50%" }}
              className="my-5 space-y-5 w-1/2"
            >
              <div>
                <h3 className="text-lg font-semibold">About you</h3>
                <div className="w-full gap-5 flex flex-wrap flex-row items-center">
                  {!isMax800px && (
                    <img
                      className="rounded-full w-12"
                      src="https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png"
                    />
                  )}
                  <div className="flex my-4 flex-col items-start">
                    <p className="text-lg font-semibold">
                      {controller.authContextConsumer.data?.name}
                    </p>
                    <p className="font-semibold">
                      {controller.authContextConsumer.data?.email}
                    </p>
                  </div>
                </div>
              </div>
              {!controller.contextConsumer.ownSalaries ||
                (!controller.contextConsumer.ownSalaries.length && (
                  <div className="flex flex-col space-y-5">
                    <p className="text-2xl font-semibold">
                      Complete these steps
                    </p>
                    <ul className="flex flex-col space-y-5">
                      <li className="w-full flex flex-row items-center justify-between">
                        <p className="text-blue-500">Contribute to community</p>
                        <Link to="/user/salary/create">
                          <Button className="bg-green-500 text-white font-semibold border-0">
                            Post a salary
                          </Button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
            </div>
            <div
              style={{ margin: isMax800px ? 0 : "" }}
              className="flex flex-col space-y-5 items-start justify-start w-1/2"
            >
              <h3 className="text-lg font-semibold">Latest salary posts</h3>
              <ul className="flex w-full gap-6 flex-row flex-wrap">
                {controller.contextConsumer?.ownSalaries?.length ? (
                  controller.contextConsumer.ownSalaries.map(
                    (salary, index) => (
                      <li key={index} className="flex flex-col">
                        <p className="text-lg text-blue-500">
                          {salary.occupation}
                        </p>
                        <p className="font-semibold"> {salary.location} </p>
                        <p className="font-light text-xs">
                          {moment(salary.createdAt).format("ll")}
                        </p>
                      </li>
                    )
                  )
                ) : (
                  <p>You don't have any search yet</p>
                )}
              </ul>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Profile;
