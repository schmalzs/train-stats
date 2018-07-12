import get from 'lodash/get';
import has from 'lodash/has';
import stationCoordinates from '../stationCoordinates';
import { getAllWeather } from '../api/weatherApi';
import { toUnixTime } from './dateUtils';
import config from '../config';

const removeErrors = data => data.filter(entry => !has(entry, 'error'));

const mergeWeatherData = (data, allWeatherData) =>
  data.map(entry => {
    const weatherEntry = allWeatherData.find(
      weatherData =>
        weatherData.time ===
        toUnixTime(entry.arrivalTime || entry.departureTime)
    );
    return {
      ...entry,
      ...get(weatherEntry, 'currently', {})
    };
  });

export const collectWeatherData = data => {
  const coordsAndTimes = data.map(entry => {
    const { LATITUDE, LONGITUDE } = stationCoordinates[entry.station];
    return {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      time: toUnixTime(entry.arrivalTime || entry.departureTime)
    };
  });

  return getAllWeather(coordsAndTimes, config.batchSize)
    .then(removeErrors)
    .then(weatherData => mergeWeatherData(data, weatherData));
};
