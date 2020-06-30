import React, { useCallback } from "react";

import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { AlertDialog, ActivityLoader, AppointmentCard, LeftWidget } from "../../components";

import { useForm } from "../../hooks";
import useHomeRedux from "./useHomeRedux"
import { getText } from "../../utils/helpers";

import useStyles from "./Home.styles"


function NotFound(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>{getText("messages.no_appointment_found")}</Box>
  )
}

function HomeScreen(props) {
  const { inputs, handleInputChange } = useForm({});
  const history = useHistory();
  const { actions, state } = useHomeRedux(inputs)

  const { appointments, rejectedAppointments, isLoading, error } = state
  const { accept, reject, onErrorClose, removeRejected } = actions
  const { date } = inputs;
  const showRejectRemoveAlert = rejectedAppointments.length > 0;
  const appointmentsList = appointments ? Object.values(appointments) : [];

  const goToCreateSlot = useCallback(
    (evt) => {
      evt.preventDefault();
      history.push("/create-slot");
    },
    [history]
  );

  return (
    <Box width="100%" padding="20px 21px">
      <AlertDialog
        show={showRejectRemoveAlert}
        handleClose={removeRejected}
        showOkay
        message={getText("message.remove_reject_appointments")}
        title={"Remove appointments"}
      />
      <Grid container spacing={5} justify="center">
        <Grid item lg={3}>
          <LeftWidget
            AvailabilityFilterProps={{ name: "date", dateValue: date, onChange: handleInputChange, title: getText("labels.show_appointment") }}
            confirmedAppointments={45}
            onCreateSlot={goToCreateSlot}
          />
        </Grid>
        <Grid item lg={6}>
          {appointmentsList.length ? appointmentsList.map(({ buyerId, slotId, id }) =>
            <AppointmentCard
              key={id}
              appoinementId={id}
              user={buyerId}
              slotInfo={slotId}
              accept={accept}
              reject={reject}
            />
          ) : <NotFound />}
        </Grid>
      </Grid>

      <ActivityLoader open={isLoading} />
      <AlertDialog
        show={Boolean(error)}
        handleClose={onErrorClose}
        showOkay
        title="Failure!"
        message={error}
      />
    </Box>
  );
}

export default HomeScreen;
