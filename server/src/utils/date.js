function minToMs(min) {
  return min * 60000;
}

function toISOString(date) {
  return new Date(date).toISOString();
}

function getRange(range = []) {
  const [fromTime, toTime] = range;
  return { fromTime: toISOString(fromTime), toTime: toISOString(toTime) };
}

function getSlotRange(date, withDiff, toDate) {
  const range = [];
  let dateIndex = new Date(date).getTime();
  const toDateIndex = new Date(toDate).getTime();
  const withDiffMs = minToMs(withDiff);
  while (dateIndex + withDiffMs <= toDateIndex) {
    range.push(getRange([dateIndex, dateIndex + withDiffMs]));
    dateIndex += withDiffMs;
  }
  return range;
}

module.exports = { getSlotRange };
