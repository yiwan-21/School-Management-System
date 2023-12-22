import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../components/Header";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("userCred");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <>
            <Navbar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
