import React from "react";

import { DataProvider } from "./context/ProvidedData";
import EditCategoryDrawer from "./components/EditCategoryDrawer";
import Navigation from "./components/Navigation";
import Pages from "./components/Pages/Pages";

export const App = props => {
  const { components } = props;
  const { ControlArea, Settings } = components;

  return (
    <DataProvider {...props}>
      <Settings id="cannedRepliesScrollContainer">
        <Navigation />
        <ControlArea standardBody={false} containerStyles={{ height: "unset" }}>
          <Pages />
          <EditCategoryDrawer />
        </ControlArea>
      </Settings>
    </DataProvider>
  );
};
