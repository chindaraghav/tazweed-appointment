import moment from 'moment';

function getNextDay(date) {
  const today = new Date(date);
  const tommorow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );
  return tommorow.getTime();
}

function formatDateToTime(date) {
  return moment(date).format('hh:mm A');
}

function isSameDay(startTime) {
  return startTime.isSame(new Date(), 'day');
}

export {getNextDay, formatDateToTime, isSameDay};
