import {
  format,
  add,
  isToday,
  isWithinInterval,
  startOfDay,
} from 'date-fns';

export default (function date() {
  const currentDate = new Date();
  const TODAY = startOfDay(currentDate);
  // MAIN PAGE date
  const DAY = format(currentDate, 'd');
  const textWeekDay = format(currentDate, 'E').toUpperCase();
  const textMonth = format(currentDate, 'LLLL').toUpperCase();

  // Task date deadline
  const formatDate = (date) => date.split('-')
    .reverse()
    .join('.');

  const getNext7Days = add(currentDate, { weeks: 1 });

  const getNext30Days = add(currentDate, { months: 1 });

  return {
    textWeekDay,
    DAY,
    textMonth,
    isToday,
    formatDate,
    getNext7Days,
    getNext30Days,
    isWithinInterval,
    currentDate,
    TODAY,
  };
}());
