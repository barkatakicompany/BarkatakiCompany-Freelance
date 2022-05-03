import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./User/helper/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() &&
        isAuthenticated().roles.find((x) => x === "ROLE_ADMIN") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default AdminRoute;
