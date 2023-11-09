import axios from 'axios';
import {getSunriseSunsetInfo} from 'sunrise-sunset-api';

import { sleep, calculateTime, convertToTimeZone, roundToHourEpochSec } from './date/utils.js';


import getApiResponse from './api/getApiResponse.js';
import getCoordinates from './api/getCoordinates.js';
import getSunsetUTCDate from './api/getSunsetUTCDate.js';
import getSunriseUTCDate from './api/getSunriseUTCDate.js';
import getCurrentWeatherData from './api/getCurrentWeatherData.js';
import getHourlyForecastArray from './api/getHourlyForecastArray.js';
import { epochHourToCondition, currentWeatherData, sunsetUTCDate, sunriseUTCDate } from './api/index.js';

import { getSunsetEpoch, getSunriseEpoch, findEpochKey, getWeatherValsFromTarget, getSunsetTargetArray, getSunriseTargetArray } from './calculation/epochWeatherMethods.js';
import { morningInfo, eveningInfo } from './calculation/epochWeatherMethods.js';
import { Range, rangeRules } from './calculation/classifyRange.js';
import { compareCodeToRange, compareCloudToRange, accessRangeInstance, getDisplayValues } from './calculation/compareToRange.js';

import sunsetMainDisplay from './components/sunsetMainDisplay.js';
import eveningMainDisplay from './components/eveningMainDisplay.js';
import tooLateDisplay from './components/tooLateDisplay.js';
import Timer from './components/timer.js';
import {executeDisplay, timerMaxLeft} from './components/index.js';
import setUpLazyLoad from './components/setUpLazyLoad.js';

import dailyWalkLogo from './images/logo.png';
import getUpText from './images/getupandgo.png';
import garden from "./images/taihanggarden.jpg";
import cloudSky from './images/cloud-sky.jpg';
import sunsetCharles from './images/yellow-sunset-charles.jpg';
import './style.css';

executeDisplay();

new Timer(
	document.querySelector(".f2-timer"));