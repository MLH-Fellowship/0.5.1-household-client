/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  Router,
  Route as DefaultRoute,
  Switch,
  Redirect,
} from "react-router-dom";

import { getAuthToken } from "./utils";

import { createBrowserHistory } from "history";
import HouseList from "./components/HouseList";
import { LoginForm } from "./components/login/login";
import { RegForm } from "./components/register/registration";
import { NewHouse } from "./components/House/create-house";

import SidebarWrapper from "./components/SidebarWrapper";
import HouseJoin from "./components/HouseJoin";

export const history = createBrowserHistory();

// would add actual logic for checking if a user is authenticated soon

const isAuthenticated = () => Boolean(getAuthToken());

const privateRouteRender = (Component, props) => {
  if (isAuthenticated()) {
    return (
      <SidebarWrapper>
        <div className="App">
          <Component {...props} />
        </div>
      </SidebarWrapper>
    );
  }
  return (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );
};

const nonAuthRouteRender = (Component, props, noAuthRequired = false) => {
  if (noAuthRequired && isAuthenticated()) {
    return <Redirect to={{ pathname: "question" }} />;
  }
  return <Component {...props} />;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <DefaultRoute
    {...rest}
    render={(props) => privateRouteRender(Component, props)}
  />
);

const Route = ({ component: Component, ensureNonAuth, ...rest }) => (
  <DefaultRoute
    {...rest}
    render={(props) => nonAuthRouteRender(Component, props, ensureNonAuth)}
  />
);
export default () => (
  <Router history={history}>
    <Switch>
      {/* you just import your component and add it here to be rendered */}

      <Route exact path="/" component={() => <Redirect to="/login" />} />
      <PrivateRoute path="/houses/join" component={HouseJoin} />
      <Route path="/login" component={LoginForm} />
      <Route path="/registration" component={RegForm} />
      <Route path="/houses/create" component={NewHouse} />
      <PrivateRoute exact path="/houses/all" component={HouseList} />
      <PrivateRoute
        path="/houses/:id"
        component={() => <h2>House Detail Page</h2>}
      />
      <PrivateRoute
        path="/house/user/join"
        component={({ location }) => (
          <Redirect to={{ pathname: "/houses/join", queryString:location.search }} />
        )}
      />
      <PrivateRoute
        path="/profile"
        component={() => (
          <h3>You should only see this page if you're authenticated</h3>
        )}
      />

      <Route component={() => <h3>404!</h3>} />
    </Switch>
  </Router>
);
