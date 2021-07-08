import React from "react";

import EditCategoryDrawer from "./components/EditCategoryDrawer";
import Navigation from "./components/Navigation";
import Pages from "./components/Pages/Pages";

export const App = props => {
  const {
    pageBaseUrl,
    pageRoute,
    successIdentifier,
    data,
    error,
    agent,
    groups,
    utils,
    components,
    icons,
    onUpdate
  } = props;
  const { ControlArea, Settings } = components;

  console.log(data);

  return (
    <Settings id="cannedRepliesScrollContainer">
      <Navigation
        pageBaseUrl={pageBaseUrl}
        pageRoute={pageRoute}
        data={data}
        agent={agent}
        utils={utils}
        components={components}
        icons={icons}
      />
      <ControlArea standardBody={false} containerStyles={{ height: "unset" }}>
        <Pages pageBaseUrl={pageBaseUrl} utils={utils} />
        <EditCategoryDrawer
          pageBaseUrl={pageBaseUrl}
          pageRoute={pageRoute}
          successIdentifier={successIdentifier}
          data={data}
          agent={agent}
          groups={groups}
          components={components}
          utils={utils}
          onUpdate={onUpdate}
        />
      </ControlArea>
    </Settings>
  );
};
