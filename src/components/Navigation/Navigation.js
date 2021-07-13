import React from "react";

import { useProvidedData } from "../../context/ProvidedData";
import NavigationSection from "../NavigationSection";
import Separator from "../Separator";

const Navigation = () => {
  const {
    pageBaseUrl,
    pageRoute,
    categoriesMapping,
    cannedRepliesMapping,
    utils,
    components,
    icons
  } = useProvidedData();

  const { lodash, makeStyles } = utils;
  const { AddButton, Divider, Link, PageNav } = components;
  const { PersonIcon, PeopleAltIcon } = icons;

  const useStyles = makeStyles(() => ({
    divider: {
      marginTop: 10,
      marginBottom: 10
    }
  }));

  const classes = useStyles();

  const groupIds = lodash.without(
    lodash.union(
      Object.keys(categoriesMapping.group),
      Object.keys(cannedRepliesMapping.group)
    ),
    "global",
    "private"
  );

  return (
    <PageNav title="Canned Replies">
      <Link as={`${pageBaseUrl}category/new`} href={pageRoute}>
        <span>
          <AddButton>Create category</AddButton>
        </span>
      </Link>
      <Separator Icon={PersonIcon}>Private</Separator>
      <NavigationSection isPrivate />
      <Divider className={classes.divider} />
      <Separator Icon={PeopleAltIcon}>Shared</Separator>
      <NavigationSection isGlobal />
      {groupIds.map(groupId => (
        <NavigationSection key={groupId} groupId={groupId} />
      ))}
    </PageNav>
  );
};

export default Navigation;
