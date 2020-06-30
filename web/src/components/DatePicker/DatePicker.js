import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

export default function DatePicker(props) {
  const { selectedDate, onChange, label, ...restProps } = props;
  const handleDateChange = (date) => {
    const pickerDate = new Date(date);
    const dateDay = pickerDate.getDate();
    const dateYear = pickerDate.getFullYear();
    const dateMonth = pickerDate.getMonth();
    onChange(new Date(dateYear, dateMonth, dateDay).getTime());
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
        {...restProps}
        style={{ display: "block", marginTop: 0 }}
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  selectedDate: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

DatePicker.defaultProps = {
  label: "",
  onChange: () => {},
  selectedDate: null,
};
