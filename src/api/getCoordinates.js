import axios from "axios";

/**
 * Name: getCoordinates 
 * 
 * Type: Function
 * 
 * Description:
 * Make GET request to iPapi to get user IP address and return latitude and longitude in an object.
 * If request fails, send error code to notify user to change location permission, or that iPapi request limit has been exceeded.
 * 
 * @return coordinates {number, number}
 * {latitude, longitude}
*/
export default async function getCoordinates () {
  //GET request to iPapi to get user location 
  const getLocation = await axios.get("https://ipapi.co/json/");
  
  //Access response object, return latitute and longitude
  function latLongData () {
    const yourLat = getLocation.data.latitude;
    const yourLong = getLocation.data.longitude;
    return {yourLat, yourLong};
  };

  // Save response object in coordinates variable
  const coordinates = await latLongData(getLocation);

  if (!coordinates) {
    res.status(400).send("Adjust location permissions or exceeded limit");
  };

  return coordinates;
};