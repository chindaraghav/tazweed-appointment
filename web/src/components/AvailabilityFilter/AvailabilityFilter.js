import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import DatePicker from "../DatePicker";

import { getNextDay } from "../../utils/helpers";

export const AVAILABILITY_TYPES = {
  TODAY: { value: "today", label: "Today" },
  TOMORROW: { value: "tomorrow", label: "Tomorrow" },
  SELECT_DATE: { value: "selectDate", label: "Select Date" },
};

const getDateByAvailability = (type) => {
  if (AVAILABILITY_TYPES.TODAY.value === type) return Date.now();
  else if (AVAILABILITY_TYPES.TOMORROW.value === type) return getNextDay(Date.now());
  else return null;
};

const AVAILABILITY_TYPE_LIST = Object.values(AVAILABILITY_TYPES);

const DateRange = ({ value, onChange }) => {
  return (
    <Box>
      <FormLabel>Select Date</FormLabel>
      <DatePicker disablePast value={value} onChange={onChange} />
    </Box>
  );
};

const AvailabilityFilter = ({ onChange, initialValue, name, dateValue, title }) => {
  const [value, changeValue] = useState(initialValue);
  const handleChange = (event) => {
    changeValue(event.target.value);
  };

  const handleDateChange = (date) => {
    onChange(name, date);
  };

  useEffect(() => {
    handleDateChange(getDateByAvailability(value));
  }, [value]);

  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <RadioGroup row aria-label="duration" name="duration" value={value} onChange={handleChange}>
        {AVAILABILITY_TYPE_LIST.map(({ label, value }) => (
          <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
        ))}
      </RadioGroup>
      {value === AVAILABILITY_TYPES.SELECT_DATE.value && (
        <DateRange name="date" value={dateValue} onChange={handleDateChange} />
      )}
    </FormControl>
  );
};

AvailabilityFilter.propTypes = {
  name: PropTypes.string.isRequired,
  dateValue: PropTypes.number,
  onChange: PropTypes.func,
  initialValue: PropTypes.oneOf(Object.values(AVAILABILITY_TYPES).map(type => type.value))
};

AvailabilityFilter.defaultProps = {
  initialValue: AVAILABILITY_TYPES.TODAY.value,
  onChange: () => { },
  dateValue: null
};

export default AvailabilityFilter;
