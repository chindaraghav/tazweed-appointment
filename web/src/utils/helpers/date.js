import moment from "moment";

function getHalflyRoundedTime(date) {
  let currentDate = new Date(date);
  let currentMinutes = currentDate.getMinutes();
  let minutesLeftToHalfHour = currentMinutes + 30 * Math.ceil(currentMinutes / 30) - currentMinutes;
  currentDate.setMinutes(minutesLeftToHalfHour);
  currentDate.setSeconds(0);
  return currentDate;
}

function getRange(date, toDate, timeDiff = 0, endMargin = 0) {
  const diffMs = minToMs(timeDiff);
  const marginMs = minToMs(endMargin);
  let quarterlyRounded = getHalflyRoundedTime(date).getTime();
  let range = [quarterlyRounded];
  while (quarterlyRounded < toDate - marginMs) {
    quarterlyRounded = quarterlyRounded + diffMs;
    range.push(quarterlyRounded);
  }
  return range;
}

function getNextDay(date) {
  const today = new Date(date);
  const tommorow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  return tommorow.getTime();
}

function getRangeFrom(date, withDiff, toDate, withEndMargin = 0) {
  const range = [];
  let dateIndex = date;
  const withDiffMs = minToMs(withDiff);
  while (dateIndex < toDate + withEndMargin) {
    dateIndex = dateIndex + withDiffMs;
    range.push(dateIndex);
  }
  return range;
}

function getRangeForTodayFrom(date, timeDiff, endMargin = 0) {
  if (!date || !timeDiff) return [];
  return getRange(date, getNextDay(date), timeDiff, endMargin);
}

function minToMs(min) {
  return min * 60000;
}

function minTillHalfPastHour(date) {
  let currentDate = new Date(date);
  let currentMinutes = currentDate.getMinutes();
  let minutesLeftToHalfHour = 30 * Math.ceil(currentMinutes / 30) - currentMinutes;
  return minutesLeftToHalfHour;
}

function isNextDay(date, duration) {
  if (!date) return null;
  let durationMs = minToMs(minTillHalfPastHour(date) + duration);
  const compareDate = date + durationMs;
  return compareDate >= getNextDay(date);
}

function formatDateToTime(date) {
  return moment(date).format("hh:mm A");
}

function getDateRangeText(fromDate, toDate) {
  return `${formatDateToTime(fromDate)} - ${formatDateToTime(toDate)}`
}

export { getRange, getRangeForTodayFrom, minToMs, isNextDay, getNextDay, getRangeFrom, formatDateToTime, getDateRangeText };
