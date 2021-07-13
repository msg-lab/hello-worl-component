import React from "react";

import NavigationSubsection from "../NavigationSubsection";

import { useProvidedData } from "../../context/ProvidedData/ProvidedData";
import * as selectors from "../../utils/selectors";

const NavigationSection = ({ isGlobal, isPrivate, groupId }) => {
  const {
    pageBaseUrl,
    pageRoute,
    cannedRepliesMapping,
    categoriesMapping,
    groupMapping,
    utils,
    components
  } = useProvidedData();

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

  const {
    name,
    cannedReplies = [],
    categories = []
  } = (() => {
    if (groupId) {
      return {
        name: groupMapping[groupId].name,
        cannedReplies: cannedRepliesMapping.group[groupId],
        categories: categoriesMapping.group[groupId]
      };
    }

    if (isGlobal) {
      return {
        name: "Global",
        cannedReplies: cannedRepliesMapping.global,
        categories: categoriesMapping.global
      };
    }

    if (isPrivate) {
      return {
        name: "Private",
        cannedReplies: cannedRepliesMapping.private,
        categories: categoriesMapping.private
      };
    }
  })();

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
        router.push(pageRoute, cannedRepliesUrl, {
          shallow: true
        });
      }}
      EndIcon={EndIcon}
    >
      {categories.map(category => (
        <NavigationSubsection
          key={category.id}
          id={category.id}
          name={category.name}
          count={selectors.countCategoryCannedReplies(category.id, {
            cannedRepliesMapping
          })}
        />
      ))}
    </SubSection>
  );
};

export default NavigationSection;
