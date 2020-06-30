import React, { useState } from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";

import { DropdownList, ContextContainer } from "..";
import { isNextDay, getText } from "../../utils/helpers";

const Duration = ({ onChange, renderMenuItem, name, fromDate }) => {
  const [value, changeValue] = useState(null);
  const onSelect = (selectedValue) => {
    changeValue(selectedValue);
    onChange(name, selectedValue);
  };
  const availableDurations = [15, 30, 45, 60, 75, 90]
    .filter((duration) => {
      return !isNextDay(fromDate, duration);
    })
    .map((item) => ({ value: item, text: item }));

  return (
    <ContextContainer title={getText("labels.duration")} description={getText("labels.duration_desc")}>
      <FormLabel>Duration</FormLabel>
      <DropdownList
        disabled={availableDurations.length === 0}
        value={value}
        placeHolderText={"Duration"}
        onClick={onSelect}
        renderData={availableDurations}
        renderItem={renderMenuItem}
      />
      <Box color="red">{availableDurations.length ? "" : getText("message.no_slots_available")}</Box>
    </ContextContainer>
  );
};

Duration.propTypes = {
  onChange: PropTypes.func,
  renderMenuItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  fromDate: PropTypes.number.isRequired
};

Duration.defaultProps = {
  onChange: () => { }
}

export default Duration;
