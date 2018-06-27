import getWeekdays from './getWeekdays';
import parseResponse from './parseResponse';
import { getTrain } from './trainApi';

const START_DATE = '2018-06-25';
const TRAIN_NUMBERS = ['680', '685'];

const trainData = [];

getWeekdays(START_DATE).forEach(date => {
  TRAIN_NUMBERS.forEach(trainNumber => {
    const [year, month, day] = date.split('-');
    getTrain(trainNumber, year, month, day)
      .then(data => {
        trainData.push(parseResponse(data));
      })
      .catch(err => trainData.push({ error: err.message }));
  });
});
