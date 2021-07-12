import React from "react";

import NavigationSection from "../NavigationSection";
import Separator from "../Separator";

const Navigation = ({
  pageBaseUrl,
  pageRoute,
  categoriesMapping,
  cannedRepliesMapping,
  groupIds,
  groupMapping,
  utils,
  components,
  icons
}) => {
  const { makeStyles } = utils;
  const { AddButton, Divider, Link, PageNav } = components;
  const { PersonIcon, PeopleAltIcon } = icons;

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
        cannedRepliesMapping={cannedRepliesMapping}
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
        cannedRepliesMapping={cannedRepliesMapping}
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
          categories={categoriesMapping.group[groupId]}
          cannedReplies={cannedRepliesMapping.group[groupId]}
          cannedRepliesMapping={cannedRepliesMapping}
          groupId={groupId}
          utils={utils}
          components={components}
          icons={icons}
        />
      ))}
    </PageNav>
  );
};

export default Navigation;
