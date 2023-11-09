import { getSunsetEpoch, findEpochKey, getWeatherValsFromTarget, getTargetArray } from './epochWeatherMethods.js';
import { weatherCode, weatherCloud, display } from './epochWeatherMethods.js';
import { Range, rangeRules } from './classifyRange.js';
import { compareCodeToRange, compareCloudToRange, accessRangeInstance, getDisplayValues } from './compareToRange.js';
import { epochHourToCondition, currentWeatherData, sunsetUTCDate, sunriseUTCDate } from '../api/index.js';
