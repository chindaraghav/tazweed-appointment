import React from "react";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import useStyles from "./ActivityLoader.styles";


function ActivityLoader({ open }) {
  const classes = useStyles();
  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress className={classes.progress} />
    </Backdrop>
  );
}

ActivityLoader.propTypes = {
  open: PropTypes.bool
};

ActivityLoader.defaultProps = {
  open: false
}

export default ActivityLoader;
