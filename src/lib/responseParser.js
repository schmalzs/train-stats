import isError from 'lodash/isError';
import isNil from 'lodash/isNil';

const STATION_KEYS = [
  'sch_arr',
  'sch_dep',
  'est_arr',
  'est_dep',
  'act_arr',
  'act_dep',
  'arr_otp',
  'dep_otp',
  'earr_otp',
  'edep_otp'
];

const isValidResponse = res => !isNil(res.number) && !isNil(res.stations);

export const parseGetTrainResponse = (date, trainNumber, res) => {
  const data = { date, trainNumber };

  if (isError(res)) {
    data.error = res.message;
  } else if (isValidResponse(res)) {
    data.date = date;
    data['train number'] = res.number || trainNumber;
    res.stations.forEach(station => {
      const stationName = station.name.split(',')[0];
      STATION_KEYS.forEach(key => {
        const value = station[key];
        data[`${stationName} - ${key}`] = !isNil(value) ? value : '';
      });
    });
  } else {
    data.error = 'No data';
  }

  return data;
};
