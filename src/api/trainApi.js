import fetch from 'node-fetch';
import isNil from 'lodash/isNil';
import batchPromises from 'batch-promises';

const URL = 'https://asm.transitdocs.com/api/trainDetail.php';

const isValidResponse = data => !isNil(data.number) && !isNil(data.stations);

export const getTrain = (train, date) => {
  console.info(`Getting information for train #${train} on ${date}...`); // eslint-disable-line no-console
  const [year, month, day] = date.split('-');
  const queryParams = Object.entries({ train, year, month, day })
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return fetch(`${URL}?${queryParams}`)
    .then(res => res.json())
    .then(data => {
      if (!isValidResponse(data)) throw new Error('NO DATA');
      return { train, date, ...data };
    })
    .catch(error => ({ train, date, error: error.message }));
};

export const getAllTrains = (trains, dates, batchSize = 8) => {
  const trainDateCombos = [];
  trains.forEach(train =>
    dates.forEach(date => trainDateCombos.push([train, date]))
  );

  return batchPromises(batchSize, trainDateCombos, ([train, date]) =>
    getTrain(train, date)
  );
};
