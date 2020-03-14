import "./assets/css/variables.css";
import "./assets/css/index.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Products from "./products";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Products} />
    </Switch>
  );
}

export default App;
