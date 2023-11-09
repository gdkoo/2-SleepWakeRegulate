/**
	* Name: getSunsetUTCDate
	* 
	* Type: Function
	* 
	* @parameter response object 
	* 
	* Description:
	* Function accesses sunset string in response from getInfo API endpoint. Sunset string is the sunset in the user's location, 
	* but formatted in UTC timezone. Function converts the sunset string into a date object.
	* 
	* @return object containing sunsetUTCDate {date object} sunset in user location but formatted in UTC timezone
*/

export default function getSunsetUTCDate (response) {
	//Convert sunset string from getInfo() response to Date object. Sunset string is in UTC timezone, based on user location.
	const sunsetUTCDate = (new Date(response.sunsetUTC));	
	return sunsetUTCDate;
}