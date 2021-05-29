import React from "react";
import Login from "./pages/Login";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoutes from "./navigators/ProtectedRoutes";
import { SalaryProvider } from "./providers/SalaryProvider";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Helmet>
            <title> Open Salary - Authentication </title>
          </Helmet>
          <Login />
        </Route>
        <SalaryProvider>
          <Route path="/user" component={ProtectedRoutes} />
        </SalaryProvider>
      </Switch>
    </Router>
  );
}

export default App;
