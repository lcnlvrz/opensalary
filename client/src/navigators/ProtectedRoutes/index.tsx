import React, { useContext, useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import AddSalary from "../../pages/AddSalary";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import SalariesResult from "../../pages/SalariesResult";
import ThanksMessage from "../../pages/ThanksMessage";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const ProtectedRoutes = () => {
  const route = useRouteMatch();

  const contextConsumer = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!contextConsumer.isLoading && !contextConsumer.data) {
      history.push("/");
    }
  }, [contextConsumer]);

  return (
    <Switch>
      <Route path={`${route.path}/home`}>
        <Helmet>
          <title> Open Salary - Home </title>
        </Helmet>
        <Home />
      </Route>
      <Route path={`${route.path}/profile`}>
        <Helmet>
          <title>Open Salary - Profile</title>
        </Helmet>
        <Profile />
      </Route>
      <Route path={`${route.path}/salary/results`}>
        <Helmet>
          <title>Open Salary - Salaries Result</title>
        </Helmet>
        <SalariesResult />
      </Route>
      <Route exact path={`${route.path}/salary/create`}>
        <Helmet>
          <title>Open Salary - Contribute </title>
        </Helmet>
        <AddSalary />
      </Route>
      <Route exact path={`${route.path}/salary/create/thanks-message`}>
        <Helmet>
          <title> Open Salary - Thanks for Contribute </title>
        </Helmet>
        <ThanksMessage />
      </Route>
    </Switch>
  );
};

export default ProtectedRoutes;
