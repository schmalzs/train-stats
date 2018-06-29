import isNil from 'lodash/isNil';

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

export const parseTrain = trainData => {
  if (trainData.error) return [trainData];

  const { date, train, stations } = trainData;

  return stations
    .map(stationData => {
      const station = stationData.name.split(',')[0].toUpperCase();
      const arrival = getArrival(stationData);
      const departure = getDeparture(stationData);

      if (!isNil(arrival) || !isNil(departure)) {
        return { date, train, station, arrival, departure };
      }
      return undefined;
    })
    .filter(data => !isNil(data));
};
