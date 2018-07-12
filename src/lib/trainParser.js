import has from 'lodash/has';
import isNil from 'lodash/isNil';
import { getAllTrains } from '../api/trainApi';
import config from '../config';

const getStationName = name => name.split(',')[0].toUpperCase();

const getTime = time => {
  const amPmIndex = time.length - 2;
  return [time.slice(0, amPmIndex), ' ', time.slice(amPmIndex)].join('');
};

const filterStations = (stations, stationsFilter) => {
  if (stationsFilter) {
    return stations.filter(station =>
      stationsFilter.includes(getStationName(station.name))
    );
  }
  return stations;
};

const getArrival = station => {
  if (!isNil(station.arr_otp)) return station.arr_otp;
  if (!isNil(station.earr_otp)) return station.earr_otp;
  return undefined;
};

const getDeparture = station => {
  if (!isNil(station.dep_otp)) return station.dep_otp;
  if (!isNil(station.edep_otp)) return station.edep_otp;
  return undefined;
};

const getArrivalTime = station => {
  if (!isNil(station.act_arr)) return getTime(station.act_arr);
  if (!isNil(station.est_arr)) return getTime(station.est_arr);
  return undefined;
};

const getDepartureTime = station => {
  if (!isNil(station.act_dep)) return getTime(station.act_dep);
  if (!isNil(station.est_dep)) return getTime(station.est_dep);
  return undefined;
};

const parseTrain = (trainData, stationsFilter) => {
  if (trainData.error) return [trainData];

  const { date, train, stations } = trainData;

  return filterStations(stations, stationsFilter)
    .map(station => {
      const stationName = getStationName(station.name);
      const arrival = getArrival(station);
      const departure = getDeparture(station);
      const arrivalTime = getArrivalTime(station);
      const departureTime = getDepartureTime(station);

      if (!isNil(arrival) || !isNil(departure)) {
        return {
          date,
          train,
          station: stationName,
          arrival,
          departure,
          arrivalTime,
          departureTime
        };
      }
      return undefined;
    })
    .filter(data => !isNil(data));
};

export const collectTrainData = (trainNumbers, weekdays, stationsFilter) =>
  getAllTrains(trainNumbers, weekdays, config.batchSize).then(trainData =>
    trainData
      .filter(data => !has(data, 'error'))
      .map(data => parseTrain(data, stationsFilter))
      .reduce((accumulator, stationData) => accumulator.concat(stationData), [])
  );
