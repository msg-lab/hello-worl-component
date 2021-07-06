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
        <Route path="/category/new">New category</Route>
      </Switch>
    </Router>
  );
};

export default Pages;
