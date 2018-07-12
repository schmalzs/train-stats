import fetch from 'node-fetch';
import batchPromises from 'batch-promises';
import { fromUnixTime } from '../lib/dateUtils';

require('dotenv').config();

const BASE_URL = 'https://api.darksky.net/forecast';
const API_KEY = process.env.DARK_SKY_API_KEY;

export const getWeather = (latitude, longitude, time) => {
  console.info(
    `Getting information for weather at [${latitude}, ${longitude}] at ${fromUnixTime(
      time
    )}...`
  ); // eslint-disable-line no-console
  return fetch(
    `${BASE_URL}/${API_KEY}/${latitude},${longitude},${time}?exclude=[minutely,hourly,daily]`
  )
    .then(res => res.json())
    .then(data => ({ latitude, longitude, time, ...data }))
    .catch(error => ({ error: error.message }));
};

export const getAllWeather = (coordsAndTimes, batchSize = 8) =>
  batchPromises(batchSize, coordsAndTimes, ({ latitude, longitude, time }) =>
    getWeather(latitude, longitude, time)
  );
