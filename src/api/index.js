import getApiResponse from './getApiResponse.js';
import getCoordinates from './getCoordinates.js';
import getSunsetUTCDate from './getSunsetUTCDate.js';
import getSunriseUTCDate from './getSunriseUTCDate.js';
import getCurrentWeatherData from './getCurrentWeatherData.js';
import getHourlyForecastArray from './getHourlyForecastArray.js';

async function execute() {
	try {
		const coordinates = await getCoordinates();
		const response = await getApiResponse(coordinates);
		const epochHourToCondition = getHourlyForecastArray(await response);
		const currentWeatherData = getCurrentWeatherData(await response);
		const sunriseUTCDate = getSunriseUTCDate(await response);
		const sunsetUTCDate = getSunsetUTCDate(await response);	
		return { epochHourToCondition, currentWeatherData, sunsetUTCDate, sunriseUTCDate };
		} catch (err) {
		console.log(err);
	}
}

const { epochHourToCondition, currentWeatherData, sunsetUTCDate, sunriseUTCDate } = await execute();
export { epochHourToCondition, currentWeatherData, sunsetUTCDate, sunriseUTCDate };