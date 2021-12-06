import React from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";

import Main from "./components/Main/index";

import { Container } from "@mui/material";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <Container className="App">
        <Switch>
          <Route
            path="/departments"
            render={() => <Main entity="Department" />}
          />
          <Route
            path="/department/:id"
            render={() => <Main entity="Employee" />}
          />
          <Redirect from="/" to="departments" />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
