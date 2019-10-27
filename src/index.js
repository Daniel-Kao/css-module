import React from "react";
import ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import { HashRouter as Router } from "react-router-dom";
import routes from "./Routes";
import "./global.css";

const App = () => <Router>{renderRoutes(routes)}</Router>;

ReactDOM.render(<App />, document.getElementById("root"));
