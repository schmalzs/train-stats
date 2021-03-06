import moment from 'moment';

moment.locale('en');

const TODAY = moment().format('YYYY-MM-DD');

const isWeekday = date => ![0, 6].includes(date.day());

export const getWeekdays = (startDate, endDate = TODAY) => {
  const weekdays = [];

  let currDate = moment(startDate);

  while (currDate.isSameOrBefore(moment(endDate))) {
    if (isWeekday(currDate)) {
      weekdays.push(currDate.format('YYYY-MM-DD'));
    }
    currDate = currDate.add(1, 'd');
  }

  return weekdays;
};

export const toUnixTime = (date, format = 'M/D/YYYY h:mm a') =>
  moment(date, format).unix();

export const fromUnixTime = (date, format = 'M/D/YYYY h:mm a') =>
  moment(date, 'X').format(format);
