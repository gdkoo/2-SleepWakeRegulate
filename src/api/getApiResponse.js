import axios from "axios";

//Make GET request to getInfo API. Return response object
export default async function getApiResponse (coordinates) {
	const info = await axios.get(`https://us-central1-dailysunsetwalk.cloudfunctions.net/info?lat=${coordinates.yourLat}&long=${coordinates.yourLong}`);
	return info.data;
}

// export { tzID, currConditionTxt, currCloud, currCode, localTimeString, localTimeEpoch, epochHourToCondition, sunsetRoundHrEpoch, sunsetDateObj };