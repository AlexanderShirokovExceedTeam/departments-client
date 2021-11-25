import React from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";

import MainContainer from "./components/mainContainer/mainContainer";

import { Container } from "@mui/material";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <Container className="App">
        <Switch>
          <Route
            path="/departments"
            render={() => <MainContainer entity="Department" />}
          />
          <Route
            path="/department/:id"
            render={() => <MainContainer entity="Employee" />}
          />
          <Redirect from="/" to="departments" />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
