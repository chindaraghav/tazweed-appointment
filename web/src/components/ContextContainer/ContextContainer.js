import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import useStyles from "./ContextContainer.styles";

function ContextContainer({ title, description, children, containerWidth, containerProps }) {
  const classes = useStyles();
  return (
    <Box className={classes.root} {...containerProps}>
      <Box className={classes.childrenContainer} style={{ width: containerWidth, }}>{children}</Box>
      <Hidden mdDown>
        <Box className={classes.contextContainer}>
          <Box className={classes.title}>{title}</Box>
          <Box className={classes.description}>{description}</Box>
        </Box>
      </Hidden>
    </Box>
  );
}

ContextContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  children: PropTypes.elementType,
  containerWidth: PropTypes.elementType,
  containerProps: PropTypes.object
};

ContextContainer.defaultProps = {
  containerWidth: "100%",
  title: "",
  children: null,
  description: null,
  containerProps: {}
};

export default ContextContainer;
