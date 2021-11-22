import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MainContainer from "./components/mainContainer/mainContainer";

import { Container, Typography } from "@mui/material";
import "./App.scss";

const App = () => {
  return (
    <Container className="App">
      <Typography className="header" variant="h1">
        Department CMS
      </Typography>
      <Switch>
        <Route
          path="/departments"
          render={() => <MainContainer entity="Department" />}
        />
        <Route
          path="/department/:id"
          render={() => <MainContainer entity="Employee" />}
        />
        <Route
          path="/employee/all"
          render={() => <MainContainer entity="Employee" />}
        />
        <Redirect from="/" to="departments" />
      </Switch>
    </Container>
  );
};

export default App;
