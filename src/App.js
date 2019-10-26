import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";

const App = () => {
  return (
    <Router>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
