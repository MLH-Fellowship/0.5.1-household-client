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

import { createBrowserHistory } from "history";
import { LoginForm } from "./components/login/login";
import { RegForm } from "./components/register/registration";
import { NewHouse } from "./components/House/create-house";

import SidebarWrapper from "./components/SidebarWrapper";

export const history = createBrowserHistory();

// would add actual logic for checking if a user is authenticated soon

const isAuthenticated = () => true;

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
      <Route exact path="/" component={() => <h2>Home page!!</h2>} />
      <Route path="/login" component={ LoginForm } />
      <Route path="/registration" component={ RegForm } />
      <Route path="/houses/create" component={ NewHouse } />
      <PrivateRoute
        path="/profile"
        component={() => (
          <h3>You should only see this page if you're authenticated</h3>
        )}
      />
      <PrivateRoute
        path="/houses/join"
        component={() => <h3>Join House!!</h3>}
      />
      <PrivateRoute
        path="/houses/create"
        component={() => <h3>Create House!!</h3>}
      />
      <PrivateRoute
        path="/houses/all"
        component={() => <h3>View your houses!!</h3>}
      />

      <Route component={() => <h3>404!</h3>} />
    </Switch>
  </Router>
);
