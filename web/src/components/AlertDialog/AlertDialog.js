import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function AlertDialog({ show, handleClose, message, title, onAgree, showOkay }) {

  const renderButtons = showOkay ? (
    <Button onClick={handleClose} color="primary">
      Okay
    </Button>
  ) : (
      <>
        <Button onClick={handleClose} color="primary">
          No
      </Button>
        <Button onClick={onAgree} color="primary">
          Yes
      </Button>
      </>
    );

  return (
    <Dialog open={show}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>{renderButtons}</DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
  onAgree: PropTypes.func,
  showOkay: PropTypes.bool
};

AlertDialog.defaultProps = {
  show: false,
  title: "",
  onAgree: () => { },
  showOkay: false,
  message: ""
}


export default AlertDialog;
