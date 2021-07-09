import React from "react";

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

  return (
    <SubSectionItem
      className={classes.root}
      item={{ id, name }}
      onClick={() => {
        router.push(pageRoute, `${pageBaseUrl}category/${id}`, {
          shallow: true
        });
      }}
      Icon={FolderOpenIcon}
      EndIcon={EndIcon}
    />
  );
};

export default NavigationSubsection;
