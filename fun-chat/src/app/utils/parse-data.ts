import type { ResponseData } from './types';
import { isValidData, isValidJSON } from './validate-functions';

function parseData(data: unknown): ResponseData | undefined {
  const prepareData: unknown = data;
  try {
    if (isValidJSON(prepareData)) {
      const parsedData: unknown = JSON.parse(prepareData);
      if (isValidData(parsedData)) {
        return parsedData;
      }
    }
  } catch {
    console.log("Can't parse data...");
  }
}

export { parseData };
