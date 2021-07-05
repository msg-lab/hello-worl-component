import React from "react";

const NavigationSubsection = ({
  id,
  name,
  count,
  utils,
  components,
  icons
}) => {
  const { makeStyles } = utils;
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

  const EndIcon = () => <span className={classes.count}>{count}</span>;

  return (
    <SubSectionItem
      className={classes.root}
      item={{ id, name }}
      Icon={FolderOpenIcon}
      EndIcon={EndIcon}
    />
  );
};

export default NavigationSubsection;
