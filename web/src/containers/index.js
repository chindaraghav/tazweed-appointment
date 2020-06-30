import React from "react";
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import AppContainer from "./AppContainer/AppContainer";
import { Home, CreateSlot, Login, SignUp } from "./pageListAsync";
import Auth from "./Auth";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

function Root() {
  const isLoggedIn = useSelector(state => state.app.isLoggedIn)
  return (
    <Router>
      <Switch>
        <Auth>
          <AppContainer>
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Route path="/signup" render={(props) => <SignUp {...props} />} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/home" component={Home} />
            <PrivateRoute isLoggedIn={isLoggedIn} path="/create-slot" component={CreateSlot} />
          </AppContainer>
        </Auth>
      </Switch>
    </Router>
  );
}

export default Root;
