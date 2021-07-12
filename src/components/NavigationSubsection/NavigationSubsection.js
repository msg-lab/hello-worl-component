import React from "react";

import * as selectors from "../../utils/selectors";

const NavigationSubsection = ({
  pageBaseUrl,
  pageRoute,
  id,
  name,
  count,
  utils,
  components,
  icons
}) => {
  const { makeStyles, useRouter } = utils;
  const { SubSectionItem } = components;
  const { FolderOpenIcon } = icons;

  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiButton-label": {
        fontWeight: 500
      }
    },
    count: {
      fontSize: "1em !important"
    }
  }));

  const classes = useStyles();

  const router = useRouter();

  const EndIcon = () => <span className={classes.count}>{count}</span>;

  const cannedRepliesUrl = selectors.cannedRepliesUrl({
    pageBaseUrl,
    categoryId: id
  });

  return (
    <SubSectionItem
      className={classes.root}
      item={{ id, name }}
      onClick={() => {
        router.push(pageRoute, cannedRepliesUrl, {
          shallow: true
        });
      }}
      Icon={FolderOpenIcon}
      EndIcon={EndIcon}
    />
  );
};

export default NavigationSubsection;
