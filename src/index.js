import React from "react";
import ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import routes from "./Routes";
import "./global.css";

const App = () => (
  <Provider store={store}>
    <Router>{renderRoutes(routes)}</Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
