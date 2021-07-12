import React from "react";

import EditCategoryDrawer from "./components/EditCategoryDrawer";
import Navigation from "./components/Navigation";
import Pages from "./components/Pages/Pages";

const mapData = (input, agent, lodash) => {
  const groupInput = lodash.groupBy(input, "groupId");
  const agentInput = lodash.groupBy(groupInput[null] || [], "agentId");
  return {
    group: lodash.pickBy(groupInput, (value, key) => key !== "null"),
    private: agentInput[agent.id] || [],
    global: agentInput[null] || []
  };
};

const mapCategorizedData = (input, agent, lodash) => {
  const categoryInput = lodash.groupBy(input, "categoryId");

  return {
    category: lodash.pickBy(categoryInput, (value, key) => key !== "null"),
    ...mapData(categoryInput[null], agent, lodash)
  };
};

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
  const { lodash } = utils;
  const { ControlArea, Settings } = components;

  const categoriesMapping = mapData(data.cannedReplyCategories, agent, lodash);
  const cannedRepliesMapping = mapCategorizedData(
    data.cannedReplies,
    agent,
    lodash
  );
  const groupIds = lodash.without(
    lodash.union(
      Object.keys(categoriesMapping.group),
      Object.keys(cannedRepliesMapping.group)
    ),
    "global",
    "private"
  );
  const groupMapping = lodash.mapValues(
    lodash.groupBy(groups, "id"),
    lodash.head
  );

  return (
    <Settings id="cannedRepliesScrollContainer">
      <Navigation
        pageBaseUrl={pageBaseUrl}
        pageRoute={pageRoute}
        categoriesMapping={categoriesMapping}
        cannedRepliesMapping={cannedRepliesMapping}
        groupIds={groupIds}
        groupMapping={groupMapping}
        utils={utils}
        components={components}
        icons={icons}
      />
      <ControlArea standardBody={false} containerStyles={{ height: "unset" }}>
        <Pages
          pageBaseUrl={pageBaseUrl}
          pageRoute={pageRoute}
          data={data}
          agent={agent}
          groups={groups}
          cannedRepliesMapping={cannedRepliesMapping}
          utils={utils}
          components={components}
          icons={icons}
        />
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
