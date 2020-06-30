import { useState } from "react";
import { minToMs } from "../utils/helpers";

function useTimeRange() {
  const [range, setRange] = useState([]);
  const fromTimeRange = range[0];

  const setFromRange = (fromTime, duration = 15) => {
    setRange([fromTime, fromTime + minToMs(duration)]);
  };
  const setToRange = (toTime) => {
    setRange([fromTimeRange, toTime]);
  };
  const resetRange = () => {
    setRange([1,2]);
  };
  return { range, setFromRange, setToRange, resetRange };
}

export default useTimeRange;
