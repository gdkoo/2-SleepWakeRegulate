import { currentWeatherData, sunsetUTCDate, sunriseUTCDate } from '../api/index.js';
import { Range, rangeRules } from './classifyRange.js';
import { morningInfo, eveningInfo } from './epochWeatherMethods.js';

/**
 * 3. then, we compare the weather to the Range class, to see if there's a match
	target can be a code or cloud 
	rangeVal can look like: obj.weather.code or obj.weather.cloud
	if we're looking at code, rangeVal = obj.weather.code
	if we're looking at cloud, rangeVal = obj.weather.cloud
*/
export function compareCodeToRange (obj, target, rangeVal) {
	for (var key in obj) {
		if (target == rangeVal) {
			return true;
		}
	};
	return false;
};

//if false, we want to look at Cloud coverage 
export function compareCloudToRange (obj, target, rangeVal) {
	for (var key in obj) {
		if (target >= rangeVal[0] && target <= rangeVal[1]) {
			return true;
		}
	}
	return false;
}

/**
 * 4. once there's a match, we use the class instance that matches to generate values to display 
TECHNICALLY, THIS FUNCTION SHOULD BE GROUPED WITH DISPLAYABLE COMPONENTS 
*/

//accessRangeInstance stores the relevant time data such as targetTime, displayableTime, and timer max
//and min given the range input parameter 
//This function returns those variables in an object.
export async function accessRangeInstance (targetRange, sunsetUTCDate, currentWeatherData, eveningInfo) {
	//calculate -> for display
	const targetTime = targetRange.timeSuggestion(await sunsetUTCDate, await currentWeatherData.tzID);
	const displayableTime = targetTime.slice(9,targetTime.length - 9);
	//const displayableDate = targetTime.slice(0, targetTimelength - 15);
	// words for display
	const maxTime = targetRange.timerMax();
	const minTime = targetRange.timerMin();
	//number for timer
	const timerMaxLeft = targetRange.minuteMax;
	let eveningMessage = undefined;
	//if evening display
	if (eveningInfo.display === 'evening') {
		eveningMessage = targetRange.eveningWalk();
	}
	return {displayableTime, maxTime, minTime, eveningMessage, timerMaxLeft};
}

/**
* SITUATIONS:
*/
/**Sunset: 
* A. when it's later than sunsetUTCDate
* 	i. if it's past sunset:
* 		use the current closet hour as epoch
*
*/


// The primariy input parameter for getDisplayValues that we should add
//is morningInfo and eveningInfo 
//
//getDisplayValues filters the rangeRules to determine which range class instance matches
//the weather code for the weather data array in morningInfo or eveningInfo
//then, it calls the acecssRangeInstance() function with the targetRange as input parameter
//return variables from getDisplayValues() is the same as the return object from accessRangeInstance()
export async function getDisplayValues() {
	/*
	*   ii. it's much later than sunset and sunsetUTCDate returned * reflects tomorrow's sunset
	*		compareToRange will return false 
	*/
	if (!eveningInfo.weatherCode || !eveningInfo.weatherCloud) {
		return;
	};
	let targetRange = rangeRules.filter(obj => compareCodeToRange(obj, eveningInfo.weatherCode, obj.weather.code))[0];
	
	//if no target range found, means that the weather code is not one of the preset options in Range.js
	//in this case, use cloud percentage to evaluate light exposure 
	if (!targetRange) {
		targetRange = rangeRules.filter(obj => compareCloudToRange(obj, eveningInfo.weatherCloud, obj.weather.cloud))[0];
	};

	const {displayableTime, maxTime, minTime, eveningMessage, timerMaxLeft} = await accessRangeInstance(targetRange, sunsetUTCDate, currentWeatherData.tzID, eveningInfo);

	return {displayableTime, maxTime, minTime, eveningMessage, timerMaxLeft};
}