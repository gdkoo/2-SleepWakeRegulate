/** 
 * Name: getHourlyForecastArray
 * 
 * Type: Function
 * 
 * @parameter response object 
 * 
 * Description: 
 * getInfo() response object contains hourly forecast information for number days specified in API request.
 * getInfo() returns hourly forecast for current day and the day after.
 * getHourlyForecastArray access response from getInfo() to get the hourly forecast object for current day.
 * Then, it maps the time in epoch format for each hour in a twenty-four hour period to an array of values containing weather 
 * condition code (see weatherapi.com documentation), cloud coverage percentage, date and time,
 * and the weather condition phrase (ie. cloudy, sunny), 
 * 
 * @return epochHourtoCondition object, keys are every hour in a twenty-four hour period of the current day - in epoch time format {number}
 * mapped to an array of values: [weather condition code, cloud cover percentage, time in regular time format, weather condition phrase]
**/

export default function getHourlyForecastArray (response) {
	//Get hourly forecast for today (Day i) from response object 
	const hourlyForecast = response.forecastDayi;
	//Map the weather values for each hour formatted in epoch time. 
	//Array keys contain each hour in time epoch from 12AM-11PM. 
	//Time epoch keys are mapped to corresponding weather condition code (see weatherapi.com documentation), cloud coverage percent,
	//date and time in non-epoch format, and weather condition phrase (ie. cloudy, sunny, rainy).
	const epochHourToCondition = hourlyForecast.map( ({time, time_epoch, condition, cloud}) => 
		({[time_epoch]:
			[
				[condition][0].code,
				cloud,
				time,
				[condition][0].text
			]
		})
	);
	return epochHourToCondition;
}