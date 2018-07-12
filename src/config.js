const config = {
  batchSize: 32,
  startDate: '2016-12-12', // earliest 2016-12-12
  endDate: '2018-07-11',
  trains: {
    '680': true,
    '681': false,
    '682': false,
    '683': false,
    '684': false,
    '685': true,
    '686': false,
    '687': false,
    '688': false,
    '689': false
  },
  stations: {
    PORTLAND: false,
    SACO: false,
    WELLS: false,
    DOVER: false,
    DURHAM: false,
    EXETER: true,
    HAVERHILL: false,
    WOBURN: false,
    BOSTON: true
  },
  outputFile: '/Users/sschmalz/Desktop/trainData.csv'
};

const getEnabledKeys = array =>
  Object.entries(array).reduce((list, [key, enabled]) => {
    if (enabled) list.push(key);
    return list;
  }, []);

export default config;
export const getTrains = () => getEnabledKeys(config.trains);
export const getStations = () => getEnabledKeys(config.stations);
