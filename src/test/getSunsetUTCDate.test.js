import getApiResponse from '../api/getApiResponse.js';
import getCoordinates from '../api/getCoordinates.js';
import getSunsetUTCDate from '../api/getSunsetUTCDate.js';

let differenceInDays;
let yourLat;
let yourLong;
let checkTime;
let allCoordinates = {
	'Dubai': [25.276987, 55.296249],
	'Paris': [48.858093, 2.294694],
	'London': [51.5073509, -0.1277583],
	'Boston': [42.361145, -71.057083],
	'Denver': [39.742043, -104.991531],
	'Seattle': [47.655548, -122.303200],
	'Beirut': [33.893536, 35.471066],
	'Jakarta': [-6.225588, 106.798553],
	'Tokyo': [35.672855, 139.817413],
	'Sydney': [-33.865143, 151.209900],
	'Hong Kong': [52.5200, 13.4050],
};

//Function: getCurrentTime(tzID)
//
//Description:
//Convert UTC current date to string in given timezone
//
function getCurrentTime(tzID) {
	let dateObjLocal= new Date();

	//Convert date object in UTC to given timezone in string format
	const completeDateInTZStr = dateObjLocal.toLocaleString("en-US",{timeZone: `${tzID}`});
	return completeDateInTZStr;
}

//Function: convertDateToTZ(dateObj, tzID)
//
//Description:
//Convert date obj to string in given timezone
//
function convertDateToTZ(dateObj, tzID) {
	const completeDateInTZStr = dateObj.toLocaleString("en-US", {timeZone: `${tzID}`});
	return completeDateInTZStr;
}

//Function: isolateDayFromDate(dateArray)
//
//Description: Helper function
//Takes in a date obj in UTC, and isolates it into only the day
//formatted as a number.
//
function isolateDayFromDate(dateObj, tzID, dateStr) {
	let completeDateInTZStr = '';

	if (dateObj) {
		//Convert date object to given timezone in string format
		completeDateInTZStr = dateObj.toLocaleString("en-US",{timeZone: `${tzID}`});
	} else {
		completeDateInTZStr = dateStr;
	}

	//Remove extraneous time info until we have M/D/YR as a string.
	const splitDateArr = completeDateInTZStr.split(' ');
	let dateStringOnly = splitDateArr[0];
	
	//Split date string into individual sections: MM, DD, YR
	//Convert only the date into a number
	let separatedDate = dateStringOnly.split('/');
	let dayDate = Number(separatedDate[1]);
	return dayDate;
}

//Function: getDayDifference()
//
//Description: Gets the difference in the two day-dates.
//For example, currentDay could be 23 but sunsetDay is 22.
//A positive difference indicates that sunset date is behind by numOfDays.
//A negative difference indicates that sunset date is ahead by numOfDays. 
//

function getDays (year, month) {
    return new Date(year, month, 0).getDate();
};

function getDayDifference(currentDay, sunsetDay) {

	let numOfDays;
	
	let difference = currentDay - sunsetDay;

	//when currentDay or sunsetDay is end of the month, either 28th, 30th, or 31,
	//the difference will be large and not accurately reflect the difference in days.
	//ie. currentDay is 31, sunsetDay is 1
	//difference is 1, but will calculate as 30.
	if (difference >= 28 || difference <= -28) {
		//get days in month
		const daysInMonth = getDays(new Date().getFullYear(), new Date().getMonth() + 1); 

		//if it's the last day of the month, assign the day as 0
		if (daysInMonth == currentDay) {
			currentDay = 0;
		} else if (daysInMonth == sunsetDay) {
			sunsetDay = 0;
		};

		difference = currentDay - sunsetDay;
	}

	if (3 > difference > 0) {
		numOfDays = Math.abs(difference);
		console.log(`sunset is behind by ${numOfDays} day(s)`);
		return difference;
	};
	
	if (-3 < difference < 0) {
		numOfDays = Math.abs(difference);
		console.log(`sunset is ahead by ${numOfDays} day(s)`);
		return difference;
	}
}

//Function: compareSunsetToCurrent(apiResponse, sunsetDateUTC)
//
//Description:
//Compares the date returned from getsunsetDateUTC() with current day
//to check if sunset returns for the same day it is called.
function compareSunsetToCurrent (apiResponse, sunsetDateUTC) {
	let tzID = apiResponse.tz_id;
	let currentTimeStr = getCurrentTime(tzID);
	let currentDay = isolateDayFromDate(null, tzID, currentTimeStr);
	let sunsetDay = isolateDayFromDate(sunsetDateUTC, tzID);

	//tests run correctly when sunset returned for the same date as 
	//the current day
	if (currentDay === sunsetDay) {
		return 0;
	}

	//if dates are not the same, test has failed. 
	//get difference in days
	if (currentDay !== sunsetDay) {
		let dayDifference = getDayDifference(currentDay, sunsetDay);
		return dayDifference;
	}
};

async function execute(yourLat, yourLong) {
	let apiResponse = await getApiResponse({yourLat, yourLong});
	let sunsetDateUTC = getSunsetUTCDate(await apiResponse);
	const sunsetTZStr = convertDateToTZ(sunsetDateUTC, apiResponse.tz_id);
	differenceInDays = compareSunsetToCurrent(await apiResponse, await sunsetDateUTC);
	return differenceInDays;
}

//The goal of this test is to ensure that sunset in UTC is correct for a given timezone 
//on the given day at the following times: 6AM, 7AM, 9PM, 10PM, 12AM
//Running this test calculates the difference in days from the current day
//and the day in the sunset data the API returns. 
//
//** Note that if the sunset is returned for the 31st and it's the 1st today,
//days will return a negative integer. 
//

describe('check if sunset date is on same day as current day', () => {

	test('sunset returned in Dubai', async () => {
		yourLat = allCoordinates['Dubai'][0];
		yourLong = allCoordinates['Dubai'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in Paris', async () => {
		yourLat = allCoordinates['Paris'][0];
		yourLong = allCoordinates['Paris'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in London', async () => {
		yourLat = allCoordinates['London'][0];
		yourLong = allCoordinates['London'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in Boston', async () => {
		yourLat = allCoordinates['Boston'][0];
		yourLong = allCoordinates['Boston'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in Denver', async () => {
		yourLat = allCoordinates['Denver'][0];
		yourLong = allCoordinates['Denver'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in Seattle', async () => {
		yourLat = allCoordinates['Seattle'][0];
		yourLong = allCoordinates['Seattle'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in Beirut', async () => {
		yourLat = allCoordinates['Beirut'][0];
		yourLong = allCoordinates['Beirut'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});


	test('sunset returned in Jakarta', async () => {
		yourLat = allCoordinates['Jakarta'][0];
		yourLong = allCoordinates['Jakarta'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in Tokyo', async () => {
		yourLat = allCoordinates['Tokyo'][0];
		yourLong = allCoordinates['Tokyo'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in Sydney', async () => {
		yourLat = allCoordinates['Sydney'][0];
		yourLong = allCoordinates['Sydney'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});

	test('sunset returned in Hong Kong', async () => {
		yourLat = allCoordinates['Hong Kong'][0];
		yourLong = allCoordinates['Hong Kong'][1];
		let differenceInDays = await execute(yourLat, yourLong);
		expect(differenceInDays).toBe(0);
	});
});