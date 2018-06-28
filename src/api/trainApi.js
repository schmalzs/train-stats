import fetch from 'node-fetch';
import batchPromises from 'batch-promises';
import { parseGetTrainResponse } from '../lib/responseParser';

const URL = 'https://asm.transitdocs.com/api/trainDetail.php';

export const getTrain = (train, year, month, day) => {
  const queryParams = Object.entries({ train, year, month, day })
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return fetch(`${URL}?${queryParams}`).then(res => res.json());
};

export const getAllTrains = (dates, trainNumbers, batchSize = 5) => {
  const dateTrainCombos = dates.reduce((combos, date) => {
    trainNumbers.forEach(trainNumber => combos.push([date, trainNumber]));
    return combos;
  }, []);

  return batchPromises(batchSize, dateTrainCombos, ([date, trainNumber]) => {
    console.info(`Getting information for train #${trainNumber} on ${date}...`); // eslint-disable-line no-console
    const [year, month, day] = date.split('-');
    return getTrain(trainNumber, year, month, day)
      .then(data => parseGetTrainResponse(date, trainNumber, data))
      .catch(err => parseGetTrainResponse(date, trainNumber, err));
  });
};
