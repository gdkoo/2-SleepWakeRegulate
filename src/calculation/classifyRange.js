import { calculateTime, convertToTimeZone } from '../date/utils.js';

/**
 * Name: Range 
 * 
 * Type: Class
 * 
 * Description:
 * The purpose of the range class is to categorize Weather codes and cloud coverage percentages
 * to easily determine how long to be outside. They have been grouped according to a rough estimate of
 * lumens of light exposure. The reasoning behind number of minutes to be outside
 * for corresponding weather codes is taken from content from Andrew Huberman of HubermanLab.
 * 
 * Three properties:
 * 1. rangeType - rangeTypes are arbitrarily numbered 1-4, with 1 being highest amount of light exposure
 * and 4 being lowest amount of light exposure.
 * 2. minuteMin - The minimum number of minutes to be outside according to the rangeType 
 * 3. minuteMax - the maximum number of minutes to be outside according to the rangeType
 * 
 * Three callable methods: 
 * 1. recommendedActivity() returns the specified minutes to be outside.
 * 2. timeSuggestion() returns the time the user should leave in the user's time zone, calculated by
 * subtracting max number of minutes to be outside according to each range from the sunset.
 * 3. eveningWalk() is called when user makes API request after sunset has passed. This returns number of
 * minutes to be outside. 
 */
export class Range {
	constructor (rangeType, minuteMin, minuteMax) {
		this.rangeType = rangeType,
		this.minuteMin = minuteMin,
		this.minuteMax = minuteMax
	}
	timerMax () {
		return `${this.weather.minMax}.` 
	}
    timerMin () {
        return `${this.weather.minMin}.`
    }
    //sunrise or sunset dateObj 
	timeSuggestion (dateObj, tzID) {
		let timeToLeave = calculateTime(dateObj, this.minuteMax);
		let TZtimeToLeave = convertToTimeZone(timeToLeave, tzID);
		return `${TZtimeToLeave}`;
	}
	eveningWalk () {
		return `It's past the hour of sunset, how about a night walk?`
	}
}

//Type 1 Object Instance
const type1 = new Range (1,5,10);
type1.weather = {};
type1.weather.code = [1000];
type1.weather.cloud = [0,29];
type1.weather.minMax = 'ten minutes';
type1.weather.minMin = 'five minutes';

//Type 2 Object Instance
const type2 = new Range (2,10,20);
type2.weather = {};
type2.weather.code = [1003];
type2.weather.cloud = [30,50];
type2.weather.minMax = 'twenty minutes';
type2.weather.minMin = 'ten minutes';

//Type 3 Object Instance
const type3 = new Range (3,20,40);
type3.weather = {};
type3.weather.code = [1006,1030];
type3.weather.cloud = [50,70];
type3.weather.minMax = 'fourty minutes';
type3.weather.minMin = 'twenty minutes';

//Type 4 Object Instance
const type4 = new Range (4,30,60);
type4.weather = {};
type4.weather.code = [1009];
type4.weather.cloud = [70,100];
type4.weather.minMax = 'sixty minutes';
type4.weather.minMin = 'thirty minutes';


export const rangeRules = [type1, type2, type3, type4];

