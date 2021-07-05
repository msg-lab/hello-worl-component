import React from "react";

import NavigationSubsection from "../NavigationSubsection";
import * as selectors from "../../utils/selectors";

const NavigationSection = ({
  name,
  categories,
  cannedReplies,
  utils,
  components,
  icons
}) => {
  const { makeStyles } = utils;
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
      EndIcon={EndIcon}
    >
      {categories.map(category => (
        <NavigationSubsection
          key={category.id}
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
