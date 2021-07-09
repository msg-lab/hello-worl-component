import React from "react";

import NavigationSection from "../NavigationSection";
import Separator from "../Separator";

const mapData = (input, agent, lodash) => {
  const groupInput = lodash.groupBy(input, "groupId");
  const agentInput = lodash.groupBy(groupInput[null], "agentId");
  return lodash.pickBy(
    {
      ...groupInput,
      private: agentInput[agent.id],
      global: agentInput[null]
    },
    (value, key) => key !== "null"
  );
};

const Navigation = ({
  pageBaseUrl,
  pageRoute,
  data,
  agent,
  groups,
  utils,
  components,
  icons
}) => {
  const { lodash, makeStyles } = utils;
  const { AddButton, Divider, Link, PageNav } = components;
  const { PersonIcon, PeopleAltIcon } = icons;

  const categoriesMapping = mapData(data.cannedReplyCategories, agent, lodash);
  const cannedRepliesMapping = mapData(data.cannedReplies, agent, lodash);
  const groupIds = lodash.without(
    lodash.union(
      Object.keys(categoriesMapping),
      Object.keys(cannedRepliesMapping)
    ),
    "global",
    "private"
  );
  const groupMapping = lodash.mapValues(
    lodash.groupBy(groups, "id"),
    lodash.head
  );

  const useStyles = makeStyles(() => ({
    divider: {
      marginTop: 10,
      marginBottom: 10
    }
  }));

  const classes = useStyles();

  return (
    <PageNav title="Canned Replies">
      <Link as={`${pageBaseUrl}category/new`} href={pageRoute}>
        <span>
          <AddButton>Create category</AddButton>
        </span>
      </Link>
      <Separator Icon={PersonIcon} utils={utils} components={components}>
        Private
      </Separator>
      <NavigationSection
        pageBaseUrl={pageBaseUrl}
        pageRoute={pageRoute}
        name="Private"
        categories={categoriesMapping.private}
        cannedReplies={cannedRepliesMapping.private}
        isPrivate
        utils={utils}
        components={components}
        icons={icons}
      />
      <Divider className={classes.divider} />
      <Separator Icon={PeopleAltIcon} utils={utils} components={components}>
        Shared
      </Separator>
      <NavigationSection
        pageBaseUrl={pageBaseUrl}
        pageRoute={pageRoute}
        name="Global"
        categories={categoriesMapping.global}
        cannedReplies={cannedRepliesMapping.global}
        isGlobal
        utils={utils}
        components={components}
        icons={icons}
      />
      {groupIds.map(groupId => (
        <NavigationSection
          pageBaseUrl={pageBaseUrl}
          pageRoute={pageRoute}
          name={groupMapping[groupId].name}
          categories={categoriesMapping[groupId]}
          cannedReplies={cannedRepliesMapping[groupId]}
          isGlobal
          utils={utils}
          components={components}
          icons={icons}
        />
      ))}
    </PageNav>
  );
};

export default Navigation;
