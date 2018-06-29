import fs from 'fs';
import jsonexport from 'jsonexport';
import { getWeekdays } from './lib/dateUtils';
import { getAllTrains } from './api/trainApi';
import { parseTrain } from './lib/responseParser';

const START_DATE = '2016-12-12';
const END_DATE = undefined;
const TRAIN_NUMBERS = [
  '680',
  '681',
  '682',
  '683',
  '684',
  '685',
  '686',
  '687',
  '688',
  '689'
];
const BATCH_SIZE = 32;
const OUTPUT_FILE = '/Users/sschmalz/Desktop/trainData.csv';

const weekdays = getWeekdays(START_DATE, END_DATE);

const parseAllTrains = data =>
  data
    .map(parseTrain)
    .reduce((accumulator, stationData) => accumulator.concat(stationData), []);

const saveData = data => {
  jsonexport(data, (exportError, csv) => {
    if (exportError) throw exportError;
    fs.writeFile(OUTPUT_FILE, csv, fileIoError => {
      if (fileIoError) throw fileIoError;
      console.log(`file saved : ${OUTPUT_FILE}`); // eslint-disable-line no-console
    });
  });
};

getAllTrains(TRAIN_NUMBERS, weekdays, BATCH_SIZE)
  .then(parseAllTrains)
  .then(saveData);
