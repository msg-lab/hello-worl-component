import React from "react";

import NavigationSubsection from "../NavigationSubsection";

import * as selectors from "../../utils/selectors";

const NavigationSection = ({
  pageBaseUrl,
  pageRoute,
  name,
  categories = [],
  cannedReplies = [],
  cannedRepliesMapping,
  groupId,
  isGlobal,
  isPrivate,
  utils,
  components,
  icons
}) => {
  const { makeStyles, useRouter } = utils;
  const { SubSection } = components;

  const useStyles = makeStyles(() => ({
    count: {
      fontSize: "1em !important"
    },
    divider: {
      display: "none"
    }
  }));

  const classes = useStyles();

  const router = useRouter();

  if (!cannedRepliesMapping && !categories.length && !cannedReplies.length) {
    return null;
  }

  const EndIcon = () => (
    <span className={classes.count}>{cannedReplies.length}</span>
  );

  const cannedRepliesUrl = selectors.cannedRepliesUrl({
    pageBaseUrl,
    isGlobal,
    isPrivate,
    groupId
  });

  return (
    <SubSection
      dividerClassName={classes.divider}
      name={name}
      isOpen
      onClick={() => {
        router.push(cannedRepliesUrl, cannedRepliesUrl, {
          shallow: true
        });
      }}
      EndIcon={EndIcon}
    >
      {categories.map(category => (
        <NavigationSubsection
          key={category.id}
          pageBaseUrl={pageBaseUrl}
          pageRoute={pageRoute}
          id={category.id}
          name={category.name}
          count={selectors.countCategoryCannedReplies(category.id, {
            cannedRepliesMapping
          })}
          utils={utils}
          components={components}
          icons={icons}
        />
      ))}
    </SubSection>
  );
};

export default NavigationSection;
