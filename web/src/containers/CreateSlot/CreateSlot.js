import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {
  ContextContainer,
  AvailabilityFilter,
  ActivityLoader,
  AlertDialog,
  TimeSlotRange,
  Duration,
} from "../../components";
import { renderItem } from "../../components/DropdownList";

import { useForm, useApiService } from "../../hooks";
import { SlotSaveService } from "../../utils/services";
import { getAlertMessage, getText } from "../../utils/helpers";

const AvailabilityDuration = (props) => {
  return (
    <ContextContainer title={getText("labels.date_of_availability")} description={getText("labels.date_of_availability_desc")}>
      <AvailabilityFilter {...props} />
    </ContextContainer>
  );
};

export default function AvailabilityForm(props) {
  const { inputs, handleInputChange } = useForm();
  const history = useHistory();
  const { state, handleSave, resetSave } = useApiService(inputs, SlotSaveService);

  const { timeRange, date, duration } = inputs;
  const { isLoading, isError, isSuccess } = state;
  const showAlert = isError || isSuccess;
  const isFormSaveable = timeRange && duration;
  const alertMessage = getAlertMessage(state);

  const resetSlotForm = () => {
    resetSave();
  };
  const onAlertAgree = () => resetSlotForm();
  const renderMenuItem = useCallback(({ data, onClick }) => renderItem({ data, onClick }), []);
  const goToHome = useCallback(
    () => {
      history.push("/home");
    },
    [history]
  );
  const onAlertClose = () => {
    !isError && goToHome();
    resetSlotForm();
  };

  return (
    <Box width="100%" padding="20px">
      <AvailabilityDuration name="date" dateValue={date} onChange={handleInputChange} title="Duration of availability" />
      <Duration
        name="duration"
        fromDate={timeRange ? timeRange[0] : date}
        renderMenuItem={renderMenuItem}
        onChange={handleInputChange}
      />
      <TimeSlotRange
        name="timeRange"
        forDate={date}
        duration={duration}
        renderMenuItem={renderMenuItem}
        onChange={handleInputChange}
      />
      <Box display="flex" flexDirection="row-reverse" width="75%" padding="10px">
        <Button onClick={goToHome} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          disabled={!isFormSaveable}
          onClick={handleSave}
          variant="contained"
          color="primary"
          style={{ marginRight: 20 }}
        >
          Save
        </Button>
      </Box>
      <ActivityLoader open={isLoading} />
      <AlertDialog
        show={showAlert}
        handleClose={onAlertClose}
        showOkay={isError}
        onAgree={onAlertAgree}
        {...alertMessage}
      />
    </Box>
  );
}
