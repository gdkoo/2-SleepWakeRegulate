import { roundToHourEpochSec } from '../date/utils.js';
import { epochHourToCondition, currentWeatherData, sunsetUTCDate, sunriseUTCDate } from '../api/index.js';

/**
 * STEPS: 
 * 1. compare the nearest epoch value of sunrise and sunset to the forecastEpoch stored in the epochHourToCondition map
*/ 
//getSunsetRoundHrEpoch: 
		// sunsetRoundHrEpoch {number} the sunset rounded to the nearest hour, formatted in seconds in epoch.
		// and rounds the date to the nearest hour, and formats into epoch in seconds. 
		//Convert sunset string in UTC from getInfo() response into nearest hour in seconds in epoch format. Keep in UTC timezone.
export function getSunsetEpoch (sunsetUTCDate) {
	const sunsetRoundHrEpoch = roundToHourEpochSec(sunsetUTCDate);


	//sunsetUTCDate returns for the following day when checking in the evening around 11
	//sunsetUTCDate returns for the previous day when checking in the early morning 
	return sunsetRoundHrEpoch;

}

//getSunriseRoundHrEpoch:
		// sunriseRoundHrEpoch {number} the sunrise rounded to the nearest hour, formatted in seconds in epoch.
		// and rounds the date to the nearest hour, and formats into epoch in seconds. 
		//Convert sunrise string in UTC from getInfo() response into nearest hour in seconds in epoch format. Keep in UTC timezone.
export function getSunriseEpoch (sunriseUTCDate) {
	const sunriseRoundHrEpoch = roundToHourEpochSec(sunriseUTCDate);
	return sunriseRoundHrEpoch;
}

export function findEpochKey (obj, target) {
	for (var key in obj) {
		if (key == target) {
			return true;
		}
	}
	return false;
}


/** 
 * Name: getWeatherValsFromTarget
 * 
 * Type: Function
 * 
 * @parameter {integer, integer}
 * 
 * Description: 
 * epochHourToCondition contains keys consisting of every hour on the current day in epoch format,
 * mapped to an array of weather values for that hour.
 * In getWeatherValsfromTarget(), we access the values and put them in variables. 
 * We only need the weather code and weather cloud as of the current iteration.  
 * 
 * @return {weather code (see glossary on website), cloud coverage in percentage }
**/

export function getWeatherValsFromTarget (returnedArr, epoch) {
	//
	//If it's much later than sunset, the weather array will be null. 
	//This is because the sunset will be returned for the following day.
	//The time in epoch for sunset on the following day will not be found in 
	//the hourly epoch array returned from epochHourToCondition for the current day.
	//
	if (returnedArr.length < 1) {
		const nullWeatherCode = null;
		const nullWeatherCloud = null;
		return {nullWeatherCode, nullWeatherCloud};
	}
	else {
		const arrayOfWeatherVals = returnedArr[0][epoch];
		const weatherCode = arrayOfWeatherVals[0];
		const weatherCloud = arrayOfWeatherVals[1];
		const weatherTxt = arrayOfWeatherVals[2];
		return {weatherCode, weatherCloud};
	}
}

/**
* SITUATIONS:
*/
export async function getSunsetTargetArray (sunsetRoundHrEpoch, localTimeEpoch) {
	/**
	* A. when it's later than sunset
	* 	i. if it's past sunset, we use the current time to find current weather:
	* 		round current time to the nearest hour
	* 		conver that time into epoch format
	* 		locate current nearest hour in epoch in epochHourToCondition
	*
	*/
	if (sunsetRoundHrEpoch < localTimeEpoch) {
		const display = 'evening';
		const currEpochHour = await roundToHourEpochSec(new Date());
		const eveningArray = await epochHourToCondition.filter(obj => findEpochKey(obj, currEpochHour));
		const {weatherCode, weatherCloud} = getWeatherValsFromTarget(eveningArray, currEpochHour);
		
		return {weatherCode, weatherCloud, display};
	};

	/**
	* B. when sunsetUTCDate is later than current time
	*   i. it's before sunset
	*		use sunsetRoundHrEpoch
	*/
	// if it's earlier than sunset
	if (sunsetRoundHrEpoch > localTimeEpoch) {
		const display = 'sunset';
		const sunsetArray = await epochHourToCondition.filter(obj => findEpochKey(obj, sunsetRoundHrEpoch));
		/*
		*   ii. it's much later than sunset and sunsetUTCDate returned * reflects tomorrow's sunset
		*		compareToRange will return false 
		*/
		//in this case, weatherCode and weatherCloud will be null, check in display
		const {weatherCode, weatherCloud} = getWeatherValsFromTarget(sunsetArray, sunsetRoundHrEpoch);
		return {weatherCode, weatherCloud, display};
	};
}

export async function getSunriseTargetArray (sunriseRoundHrEpoch, localTimeEpoch) {
	//A. when it's past sunrise 
	if (sunriseRoundHrEpoch < localTimeEpoch) {
		const display = 'morning';
		const currEpochHour = await roundToHourEpochSec(new Date());
		const morningArray = await epochHourToCondition.filter(obj => findEpochKey(obj, currEpochHour));
		const {weatherCode, weatherCloud} = getWeatherValsFromTarget(morningArray, currEpochHour);
		return {weatherCode, weatherCloud, display};
	}


	//B. when it's earlier than sunrise
	if (sunriseRoundHrEpoch > localTimeEpoch) {
		const display = 'sunrise';
		const sunriseArray = await epochHourToCondition.filter(obj => findEpochKey(obj, sunriseRoundHrEpoch));
		const {weatherCode, weatherCloud} = getWeatherValsFromTarget(sunriseArray, sunriseRoundHrEpoch);
		return {weatherCode, weatherCloud, display};
	}
}

export async function execute () {
	const sunsetRoundHrEpoch = await getSunsetEpoch(sunsetUTCDate);
	const sunriseRoundHrEpoch = await getSunriseEpoch(sunriseUTCDate);
	const localTimeEpoch = await currentWeatherData.localTimeEpoch;
	//morningInfo = {weatherCode, weatherCloud, display};
	//eveningInfo = {weatherCode, weatherCloud, display};
	const eveningInfo = await getSunsetTargetArray(sunsetRoundHrEpoch, localTimeEpoch);
	const morningInfo = await getSunriseTargetArray(sunriseRoundHrEpoch, localTimeEpoch);
	return {morningInfo, eveningInfo};

}

const {morningInfo, eveningInfo} = await execute();
export {morningInfo, eveningInfo};