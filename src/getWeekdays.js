import moment from 'moment';

moment.locale('en');

const TODAY = moment().startOf('day');

const isWeekday = date => ![0, 6].includes(date.day());

const getAllWeekdays = (startDate, endDate = TODAY) => {
  const weekdays = [];
  let currDate = startDate;

  while (currDate.isSameOrBefore(endDate)) {
    if (isWeekday(currDate)) {
      weekdays.push(currDate.format('YYYY-MM-DD'));
    }
    currDate = currDate.add(1, 'd');
  }

  return weekdays;
};

export default startDate => getAllWeekdays(moment(startDate));
