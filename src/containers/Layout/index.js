import React from "react";
import { renderRoutes } from "react-router-config";
import Header from "../../components/Header";

const Layout = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default Layout;
