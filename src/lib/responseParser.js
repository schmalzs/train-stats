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

export const parseGetTrainResponse = res => {
  const data = {};

  data['train name'] = res.name;
  data['train number'] = res.number;
  res.stations.forEach(station => {
    const stationName = station.name.split(',')[0];
    STATION_KEYS.forEach(key => {
      const value = station[key];
      data[`${stationName} - ${key}`] = !isNil(value) ? value : '';
    });
  });

  return data;
};
