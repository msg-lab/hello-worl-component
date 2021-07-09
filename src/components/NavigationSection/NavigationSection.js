import React from "react";

import NavigationSubsection from "../NavigationSubsection";
import * as selectors from "../../utils/selectors";

const NavigationSection = ({
  pageBaseUrl,
  pageRoute,
  name,
  categories,
  cannedReplies,
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
      marginTop: 10,
      marginBottom: 10
    }
  }));

  const classes = useStyles();

  const router = useRouter();

  const rootCannedRepliesCount = selectors.categoryCannedRepliesCount(
    undefined,
    { cannedReplies }
  );

  const EndIcon = () => (
    <span className={classes.count}>{rootCannedRepliesCount}</span>
  );

  return (
    <SubSection
      dividerClassName={classes.divider}
      name={name}
      isOpen
      onClick={() => {
        if (isGlobal) {
          return router.push(pageRoute, `${pageBaseUrl}global`, {
            shallow: true
          });
        }

        if (isPrivate) {
          return router.push(pageRoute, `${pageBaseUrl}private`, {
            shallow: true
          });
        }

        return router.push(pageRoute, `${pageBaseUrl}group/${groupId}`, {
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
          count={selectors.categoryCannedRepliesCount(category, {
            cannedReplies
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
