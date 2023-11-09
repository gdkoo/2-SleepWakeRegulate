/**
	* Name: getCurrentWeatherData 
	* 
	* Type: Function
	* 
	* @parameter response object 
	* 
	* Description:
	* Function accesses response from getInfo() which contains weather forecast in CST and current weather information written as if
	* in user timezone. All based on user location. 
	* Function saves current weather data in string format in variables.
	* 
	* @return object containing string variables: currConditionTxt, currCode, currCloud, tzID, localTimeEpoch, localTimeString.
*/

export default function getCurrentWeatherData (response) {
	const currConditionTxt = response.current_text;
	//Weather code information can be found on https://www.weatherapi.com/ docs.
	const currCode = response.current_code;
	//Cloud coverage is a numerical percent
	const currCloud = response.current_cloud;
	//Time zone ID can be found on Wikipedia 
	const tzID = response.tz_id;
	const localTimeEpoch = response.localtime_epoch;
	//Does not specify timezone but displays time as if in current timezone.
	const localTimeString = response.localtime_string;
	
	console.log(`At current time: ${localTimeString} in: ${tzID}, it is: ${currConditionTxt.toLowerCase()} and cloud coverage is: ${currCloud}.`);
	return {currConditionTxt, currCode, currCloud, tzID, localTimeEpoch, localTimeString};
}