import React from "react";

import Navigation from "./components/Navigation";
import Pages from "./components/Pages/Pages";

export const App = props => {
  const {
    pageBaseUrl,
    pageRoute,
    data,
    agent,
    utils,
    components,
    icons
  } = props;
  const { ControlArea, Settings } = components;

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
      </ControlArea>
    </Settings>
  );
};
