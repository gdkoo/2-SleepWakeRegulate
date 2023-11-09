export function sleep (ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Name: calculateTime 
 * 
 * @param date {string or Date object}
 * @param minutes {integer}  
 * 
 * Description: Creates a new Date object from date. Converts date into minutes
 * and subtracts minute parameter. 
 * 
 * @return dateCopy {date}
 */
export function calculateTime (date, minutes) {
	const dateCopy = new Date(date);
	dateCopy.setMinutes(dateCopy.getMinutes() - minutes);
	return dateCopy; 
}


/**
 * Name: convertToTimeZone 
 * 
 * @param time {string or Date object}
 * @param yourTZ {string} (takes yourTZ param from getTzSunriseSunset as default)
 * 
 * Description: Converts a date string into designated timezone according to YY-MM-DD.
 * Takes in two parameters: time (string) and 
 * yourTZ (string, use from https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 
 * Returns a date string in the timezone specified in yourTZ. 
 * 
 * @return dateInNewTimeZone {string}
 */
export function convertToTimeZone (time, yourTZ) {
	const options = {
		year: '2-digit', month: '2-digit', day: '2-digit',
		hour: '2-digit', minute: '2-digit', second: '2-digit',
		timeZone: yourTZ,
		timeZoneName: 'short'
	}
	const formatter = new Intl.DateTimeFormat('sv-SE', options)
	const startingDate = new Date(time)
	const dateInNewTimezone = formatter.format(startingDate) 
	return dateInNewTimezone;
}

/**
 * Name: roundToHourEpochSec 
 *  
 * {param}: date (date object)
 * 
 * Description: Round date object to the nearest hour, return in seconds since epoch.  
 *
 */ 
export function roundToHourEpochSec (date) {
  let m = 60 * 60 * 1000; // milliseconds in an hour
  let s = 60 * 60; //seconds in an hour 
  let d = Math.round(date.getTime() / m ) * s;
  return d;
}