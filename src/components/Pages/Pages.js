import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Pages = ({ pageBaseUrl, utils }) => {
  const { useRouter } = utils;

  const router = useRouter();
  const { asPath } = router;
  const path = `${asPath}/`.replace(new RegExp(`^${pageBaseUrl}`), "/");

  return (
    <Router>
      <Switch location={{ pathname: path }}>
        <Route path="/private">Private listing</Route>
        <Route path="/global">Global listing</Route>
        <Route path="/group/:id">Group listing</Route>
        <Route path="/category/:id">Category listing</Route>
      </Switch>
    </Router>
  );
};

export default Pages;
