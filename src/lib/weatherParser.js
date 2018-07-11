import get from 'lodash/get';
import stationCoordinates from '../stationCoordinates';
import { getAllWeather } from '../api/weatherApi';
import { getUnixTime } from './dateUtils';
import config from '../config';

export const collectWeatherData = data => {
  const coordsAndTimes = data.map(entry => {
    const { LATITUDE, LONGITUDE } = stationCoordinates[entry.station];
    return {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      time: getUnixTime(entry.arrivalTime || entry.departureTime)
    };
  });

  return getAllWeather(coordsAndTimes, config.batchSize).then(allWeatherData =>
    data.map(entry => {
      const weatherEntry = allWeatherData.find(
        weatherData =>
          weatherData.time ===
          getUnixTime(entry.arrivalTime || entry.departureTime)
      );
      return {
        ...entry,
        ...get(weatherEntry, 'currently', {})
      };
    })
  );
};
