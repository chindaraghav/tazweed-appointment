import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ActivityLoader } from "../components";
import { UserTokenUtil } from "../utils/services";

const LOGIN_ROUTE = "/login";
const HOME_ROUTE = "/home";

function Auth(props) {
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const userUtil = new UserTokenUtil();
    let redirectRoute;
    if (userUtil.isLoggedIn()) {
      redirectRoute = HOME_ROUTE;
    } else {
      redirectRoute = LOGIN_ROUTE;
    }
    setLoading(false);
    history.replace(redirectRoute);
  }, []);
  const { children } = props;
  return (
    <>
      {isLoading ? <ActivityLoader /> : <div />}
      {children}
    </>
  );
}

export default Auth;
