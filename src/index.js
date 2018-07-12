import { getWeekdays } from './lib/dateUtils';
import { collectTrainData } from './lib/trainParser';
import { collectWeatherData } from './lib/weatherParser';
import { saveData } from './lib/dataSaver';
import config, { getTrains, getStations } from './config';

const trains = getTrains();
const weekdays = getWeekdays(config.startDate, config.endDate).reverse();
const stations = getStations();

collectTrainData(trains, weekdays, stations)
  .then(collectWeatherData)
  .then(saveData)
  .catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
