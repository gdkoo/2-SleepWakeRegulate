// import { Range, rangeRules } from './classifyRange.js';
// // import { tzID, currConditionTxt, currCloud, currCode, localTimeString, localTimeEpoch }
// // epochHourToCondition from getHourlyForecastArray
// // sunsetRoundHrEpoch 
// // getSunsetUTCDate
// import eveningMainDisplay from '../components/eveningMainDisplay.js';
// import sunsetMainDisplay from '../components/sunsetMainDisplay.js';
// import { convertToTimeZone, roundToHourEpochSec } from '../date/utils.js';


// //Sunset in correct timezone in string format
// console.log(`Sunset: ${convertToTimeZone(sunsetDateObj, tzID)}`);

// /** 
//  * Find nearest hour and corresponding weather code. Compare weather code to rules from
//  * Range to determine minimum and maximum time required for walk and time to go outside.
//  * Display time message and min and max minutes on browser.
//  * 
//  **/
// let timerMaxLeft = 0;
// //Locate sunsetRoundHrEpoch to find key-value in hourly forecast closest to sunset.
// //Or use currRoundHrEpoch if it is past sunset to use the hour closest to current time.
// //Then, compare the weather code to Range objects and find the rangeType.
// //Use Range callable methods to return recommendations for the user based on forecast.
// //If user checks after sunset for the current day, find the key matching current time in epoch
// //And match to range type. 
// //The user is checking after sunset has passed
// if (sunsetRoundHrEpoch < localTimeEpoch) {
// 	//CURRENT TIME, PAST SUNSET 
	
// 	const currEpoch = roundToHourEpochSec(new Date());

// 	const matchCurrEpoch = function (obj) {
// 		for (var keys in obj) {
// 			if (keys == currEpoch) {
// 				return true;
// 			}
// 		}
// 	};

// 	const eveningHrArr = epochHourToCondition.filter(matchCurrEpoch);

// 	const eveningHrVal = eveningHrArr[0][currEpoch];
// 	const eveningHrCode = eveningHrVal[0];
// 	const eveningHrClo = eveningHrVal[1];
// 	const eveningHrTxt = eveningHrVal[2];

// 	//The range instance containing evening weather code value 
// 	const findEveningRange = function (obj) {
// 		for (var key in obj) {
// 			if (eveningHrCode == obj.weather.code) {
// 				return true;
// 			}
// 		}
// 	};
// 	const eveningRange = rangeRules.filter(findEveningRange)[0];

// 	//when the weather code for today doesn't match any of the codes from the Range key
// 	//sunsetRange will be undefined.
// 	//then, we check cloud coverage 
// 	if (!eveningRange) {
// 		console.log(`this is the weather code ${eveningHrCode} and blurb: ${eveningHrTxt}`);
// 		const findCloudEveningRange = function (obj) {
// 			for (var keys in obj) {
// 				if (eveningHrClo >= obj.weather.cloud[0] && eveningHrClo <= obj.weather.cloud[1]) {
// 					return true;
// 				}
// 			}
// 		}
// 		const cloudEveningRange = rangeRules.filter(findCloudEveningRange)[0];
// 		const cloudEveningTimeToLeave = cloudEveningRange.timeSuggestion(sunsetDateObj, tzID);
// 		const cloudDisplayableEveningTime = cloudEveningTimeToLeave.slice(9,cloudEveningTimeToLeave.length - 9);
// 		const cloudDisplayableEveningDate = cloudEveningTimeToLeave.slice(0, cloudEveningTimeToLeave.length - 15);
// 		timerMaxLeft = cloudEveningRange.minuteMax;

// 		const cloudEveningTimerMessage = cloudEveningRange.eveningWalk();
// 		const cloudEveningMaxTime = cloudEveningRange.timerMax();
// 		const cloudEveningMinTime = cloudEveningRange.timerMin();

// 		eveningMainDisplay(cloudDisplayableEveningTime, cloudEveningMaxTime,cloudEveningMinTime, cloudEveningTimerMessage);
// 		//steps to check what cloud coverage is
// 		//if cloud coverage is above a certain percentage of above a certain percentage
// 	}
//  	//recommendation for the evening executed in DOM
//  	else {
// 	 	const eveningTimeToLeave = eveningRange.timeSuggestion(sunsetDateObj, tzID);
// 		const displayableEveningTime = eveningTimeToLeave.slice(9, eveningTimeToLeave.length - 9);
// 		const displayableEveningDate = eveningTimeToLeave.slice(0, eveningTimeToLeave - 15);
// 		timerMaxLeft = eveningRange.minuteMax;
		
// 		const eveningTimerMessage = eveningRange.eveningWalk();
// 		const eveningMaxTime = eveningRange.timerMax();
// 		const eveningMinTime = eveningRange.timerMin();

// 		eveningMainDisplay(displayableEveningTime, eveningMaxTime, eveningMinTime, eveningTimerMessage);
//  	}
// }

// //The user is checking before sunset or the user is checking after sunset 
// //and it's late enough that sunrise-sunset.api returns the sunset for tomorrow
// else {
// 	const matchSunsetEpoch = function (obj) {
// 		for (var keys in obj) {
// 			if (keys == sunsetRoundHrEpoch) {
// 				return true;
// 			}
// 			else {
// 				return false;
// 			}
// 		}
// 	};
// 	const sunsetHrArr = epochHourToCondition.filter(matchSunsetEpoch);

// 	//If it's past sunset and sunrise-sunset API is returning sunset for following day, 
// 	//findSunsetEpoch will return false and sunsetWeatherArr is undefined.
// 	if (!sunsetHrArr) {
// 		console.log(`Oops, error! This is the sunset returning from sunrise-sunset API: ${sunsetDateObj}. API returns sunset for tomorrow if it is too late in the evening.`);
// 		const tooLate = document.querySelector('.time');
// 		tooLate.innerHTML = "Oops. Looks like it's too late today. Check back tomorrow."
// 	}
// 	const sunsetHrArrVal = sunsetHrArr[0][sunsetRoundHrEpoch];
// 	const sunsetHrArrCode = sunsetHrArrVal[0];
// 	const sunsetHrArrClo = sunsetHrArrVal[1];
// 	const sunsetHrArrValTxt = sunsetHrArrVal[2];

// 	const findSunsetRange = function(obj) {
// 		for (var keys in obj) {
// 			if (sunsetHrArrCode == obj.weather.code) {
// 				return true;
// 			}
// 		}
// 	};
// 	const sunsetRange = rangeRules.filter(findSunsetRange)[0];

// 	//when the weather code for today doesn't match any of the codes from the Range key
// 	//sunsetRange will be undefined.
// 	//then, we check cloud coverage 
// 	if (!sunsetRange) {
// 		console.log(`this is the weather code ${sunsetHrArrCode} and blurb: ${sunsetHrArrValTxt}`);
// 		const findCloudSunsetRange = function (obj) {
// 			for (var keys in obj) {
// 				if (sunsetHrArrClo >= obj.weather.cloud[0] && sunsetHrArrClo <= obj.weather.cloud[1]) {
// 					return true;
// 				}
// 			}
// 		}
// 		const cloudSunsetRange = rangeRules.filter(findCloudSunsetRange)[0];
// 		const cloudTimeToLeave = cloudSunsetRange.timeSuggestion(sunsetDateObj, tzID);
// 		const cloudDisplayableTime = cloudTimeToLeave.slice(9,cloudTimeToLeave.length - 9);
// 		const cloudDisplayableDate = cloudTimeToLeave.slice(0, cloudTimeToLeave.length - 15);
// 		timerMaxLeft = cloudSunsetRange.minuteMax;
// 		const cloMaxTime = cloudSunsetRange.timerMax();
// 		const cloMinTime = cloudSunsetRange.timerMin();

// 		sunsetMainDisplay(cloudDisplayableTime, cloMaxTime, cloMinTime);
// 		//steps to check what cloud coverage is
// 		//if cloud coverage is above a certain percentage of above a certain percentage 
// 	}

// 	else {
// 		const timeToLeave = sunsetRange.timeSuggestion(sunsetDateObj, tzID);
// 		const displayableTime = timeToLeave.slice(9,timeToLeave.length - 9);
// 		const displayableDate = timeToLeave.slice(0, timeToLeave.length - 15);
// 		timerMaxLeft = sunsetRange.minuteMax;
// 		const maxTime = sunsetRange.timerMax();
// 		const minTime = sunsetRange.timerMin();

// 		sunsetMainDisplay(displayableTime, maxTime, minTime);
// 	}
// }



// export { timerMaxLeft };