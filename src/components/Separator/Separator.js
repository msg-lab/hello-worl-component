import React from "react";

import { useProvidedData } from "../../context/ProvidedData/ProvidedData";

const Separator = ({ Icon, children }) => {
  const { components, utils } = useProvidedData();

  const { Typography } = components;
  const { makeStyles } = utils;

  const useStyles = makeStyles(() => ({
    separator: {
      marginBottom: 10,
      fontWeight: "500 !important"
    },
    icon: {
      verticalAlign: "middle"
    }
  }));

  const classes = useStyles();

  return (
    <Typography className={classes.separator}>
      <Icon className={classes.icon} /> <span>{children}</span>
    </Typography>
  );
};

export default Separator;
