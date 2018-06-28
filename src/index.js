import fs from 'fs';
import jsonexport from 'jsonexport';
import { getWeekdays } from './lib/dateUtils';
import { getAllTrains } from './api/trainApi';

const START_DATE = '2018-06-18';
const TRAIN_NUMBERS = ['680'];
const BATCH_SIZE = 8;
const OUTPUT_FILE = '/Users/sschmalz/Desktop/trainData.csv';

const weekdays = getWeekdays(START_DATE);

getAllTrains(weekdays, TRAIN_NUMBERS, BATCH_SIZE).then(data => {
  jsonexport(data, (exportError, csv) => {
    if (exportError) throw exportError;
    fs.writeFile(OUTPUT_FILE, csv, fileIoError => {
      if (fileIoError) throw fileIoError;
      console.log('file saved'); // eslint-disable-line no-console
    });
  });
});
