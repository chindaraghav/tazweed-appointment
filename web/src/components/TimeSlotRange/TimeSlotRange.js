import React, { useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import DropdownList, { DefaultMenuItem } from "../DropdownList";
import ContextContainer from "../ContextContainer";

import { useTimeRange } from "../../hooks";
import { getRangeForTodayFrom, getNextDay, getRangeFrom, formatDateToTime, getText } from "../../utils/helpers";

const TIME_DIFF = 15;
const renderSlotTimeItem = ({ data, onClick }) => {
  const onChange = () => {
    onClick(data);
  };
  return (
    <DefaultMenuItem key={data} onClick={onChange}>
      {formatDateToTime(data)}
    </DefaultMenuItem>
  );
};

const TimeSlotRange = ({ onChange, name, duration, forDate }) => {
  let { range, setFromRange, setToRange, resetRange } = useTimeRange();
  const renderMenuItem = useCallback(({ data, onClick }) => renderSlotTimeItem({ data, onClick }), []);

  const fromTime = range[0];
  const toTime = range[1];

  useEffect(() => {
    fromTime && resetRange();
  }, [forDate, duration]);
  const fromTimeList = useMemo(() => (duration ? getRangeForTodayFrom(forDate, TIME_DIFF, duration) : []), [
    forDate,
    duration,
  ]);

  const toTimeList = useMemo(
    () => (fromTime && duration ? getRangeFrom(fromTime, duration, getNextDay(fromTime)) : []),
    [fromTime, duration]
  );

  const setFromTime = (date) => {
    setFromRange(date, duration);
  };

  useEffect(() => {
    if (fromTime) {
      setFromTime(fromTime, duration);
    }
  }, [duration]);

  useEffect(() => {
    if (fromTime && toTime) {
      onChange(name, range);
    }
  }, [range]);

  return (
    <ContextContainer title={getText("labels.time_range")} description={getText("labels.time_range_desc")}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <FormLabel>Start Time</FormLabel>
          <DropdownList
            disabled={!Boolean(duration)}
            placeHolderText={"Start Time"}
            value={fromTime && formatDateToTime(fromTime)}
            onClick={setFromTime}
            renderData={fromTimeList}
            renderItem={renderMenuItem}
          />
        </Box>
        <Box>
          <FormLabel>End Time</FormLabel>
          <DropdownList
            disabled={!Boolean(fromTime)}
            placeHolderText={"End Time"}
            value={toTime && formatDateToTime(toTime)}
            onClick={setToRange}
            renderData={toTimeList}
            renderItem={renderMenuItem}
          />
        </Box>
      </Box>
    </ContextContainer>
  );
};

TimeSlotRange.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  forDate: PropTypes.number.isRequired,
  duration: PropTypes.number,
};

TimeSlotRange.defaultProps = {
  duration: null
}

export default TimeSlotRange;
