import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useProvidedData } from "../../context/ProvidedData";
import CannedRepliesPage from "../CannedRepliesPage";

const Pages = () => {
  const {
    pageBaseUrl,
    pageRoute,
    data,
    agent,
    groups,
    cannedRepliesMapping,
    utils,
    components,
    icons
  } = useProvidedData();

  const { useRouter } = utils;

  const router = useRouter();
  const { asPath } = router;
  const path = `${asPath}/`.replace(new RegExp(`^${pageBaseUrl}`), "/");

  return (
    <Router>
      <Switch location={{ pathname: path }}>
        <Route
          path="/private"
          render={() => (
            <CannedRepliesPage
              pageBaseUrl={pageBaseUrl}
              pageRoute={pageRoute}
              isPrivate
              data={data}
              agent={agent}
              groups={groups}
              cannedReplies={cannedRepliesMapping.private}
              utils={utils}
              components={components}
              icons={icons}
            />
          )}
        />
        <Route
          path="/global"
          render={() => (
            <CannedRepliesPage
              pageBaseUrl={pageBaseUrl}
              pageRoute={pageRoute}
              isGlobal
              data={data}
              agent={agent}
              groups={groups}
              cannedReplies={cannedRepliesMapping.global}
              utils={utils}
              components={components}
              icons={icons}
            />
          )}
        />
        <Route
          path="/group/:groupId"
          render={({ match }) => (
            <CannedRepliesPage
              pageBaseUrl={pageBaseUrl}
              pageRoute={pageRoute}
              groupId={Number(match.params.groupId)}
              data={data}
              agent={agent}
              groups={groups}
              cannedReplies={cannedRepliesMapping.group[match.params.groupId]}
              utils={utils}
              components={components}
              icons={icons}
            />
          )}
        />
        <Route
          path="/category/:categoryId"
          render={({ match }) => (
            <CannedRepliesPage
              pageBaseUrl={pageBaseUrl}
              pageRoute={pageRoute}
              categoryId={Number(match.params.categoryId)}
              data={data}
              agent={agent}
              groups={groups}
              cannedReplies={
                cannedRepliesMapping.category[match.params.categoryId]
              }
              utils={utils}
              components={components}
              icons={icons}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default Pages;
