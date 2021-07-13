import React, { useContext } from "react";

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

const DataContext = React.createContext({
  pageBaseUrl: null,
  pageRoute: null,
  successIdentifier: null,
  data: null,
  error: null,
  agent: null,
  groups: null,
  cannedRepliesMapping: null,
  categoriesMapping: null,
  groupMapping: null,
  utils: null,
  components: null,
  icons: null,
  onUpdate: null,
  onErrorMessage: null,
  onDismissError: null
});

export const DataProvider = ({ children, ...props }) => {
  const { data, agent, groups, utils } = props;
  const { lodash } = utils;

  const categoriesMapping = mapData(data.cannedReplyCategories, agent, lodash);
  const cannedRepliesMapping = mapCategorizedData(
    data.cannedReplies,
    agent,
    lodash
  );

  const groupMapping = lodash.mapValues(
    lodash.groupBy(groups, "id"),
    lodash.head
  );

  return (
    <DataContext.Provider
      value={{
        ...props,
        cannedRepliesMapping,
        categoriesMapping,
        groupMapping
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useProvidedData = () => useContext(DataContext);
