import fs from 'fs';
import jsonexport from 'jsonexport/lib/index';
import config from '../config';

export const saveData = (data, outputFilename = config.outputFile) => {
  jsonexport(data, (exportError, csv) => {
    if (exportError) throw exportError;
    fs.writeFile(outputFilename, csv, fileIoError => {
      if (fileIoError) throw fileIoError;
      console.log(`file saved : ${outputFilename}`); // eslint-disable-line no-console
    });
  });
};
