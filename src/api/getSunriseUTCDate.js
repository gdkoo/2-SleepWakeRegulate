/**
	* Name: getSunriseUTCDate
	* 
	* Type: Function
	* 
	* @parameter response object 
	* 
	* Description:
	* Function accesses sunrise string in response from getInfo API endpoint. Sunrise string is the sunrise in the user's location, 
	* but formatted in UTC timezone. Function converts the sunrise string into a date object.
	* 
	* @return object containing sunriseUTCDate {date object} sunrise in user location but formatted in UTC timezone
*/

export default function getSunriseUTCDate (response) {
	//Convert sunset string from getInfo() response to Date object. Sunset string is in UTC timezone, based on user location.
	const sunriseUTCDate = (new Date(response.sunriseUTC));	
	return sunriseUTCDate;
}