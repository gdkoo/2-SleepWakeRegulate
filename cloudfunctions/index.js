const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors");
const {getSunriseSunsetInfo} = require("sunrise-sunset-api");

// Initialize Firebase resource
admin.initializeApp();

const corsHandler = cors({"Access-Control-Allow-Origin": "*"});

// START serverless function trigger
exports.info = functions.https.onRequest(async (req, res) => {
  // If request is PUT, error will be thrown
  if (req.method === "PUT") {
    res.status(403).send("Forbidden!");
    return;
  }
  // CHECK IF REQUEST CONTAINS COORDINATES OBJECT AND IS NOT NULL
  // THEN, USE COORDINATES IN API REQUEST TO GETSUNRISESUNSETINFO
  console.log(typeof req.query.lat);
  console.log(req.query.long);

  let info = {};

  // Start of CORS Request
  corsHandler(req, res, async () => {
    // THIRD PARTY API REQUEST USING GETSUNRISESUNSETINFO PACKAGE
    const sunResponse = await getSunriseSunsetInfo({
      latitude: Number(req.query.lat),
      longitude: Number(req.query.long),
      formatted: false,
    });

    // STORE SUNRISE AND SUNSET IN UTC IN VARIABLES
    const sunriseUTC = await sunResponse.sunrise;
    const sunsetUTC = await sunResponse.sunset;

    // IF SUNRISE AND SUNSET ARE UNDEFINED, PROBLEM WITH IPAPI OR SUNRISE/SUNSET
    if (!sunriseUTC || !sunsetUTC) {
      res.status(400).send("Bad request with sunrise and sunset. Try again.");
    }

    const getWeather = await axios.get("http://api.weatherapi.com/v1/forecast.json", {
      params: {
        key: `${process.env.WEATHER_SECRET_KEY}`,
        q: await `${req.query.lat} ${req.query.long}`,
        days: 2,
      },
    });

    if (!getWeather) {
      res.status(400).send("Bad request with weather API. Try again later.");
    }

    const tzID = await getWeather.data.location.tz_id;
    const localTimeEpoch = await getWeather.data.location.localtime_epoch;
    // Does not specify timezone but displays time as if in current timezone.
    const localTimeString = await getWeather.data.location.localtime;

    const currConditionTxt = await getWeather.data.current.condition.text;
    const currConditionCode = await getWeather.data.current.condition.code;
    const currCloud = await getWeather.data.current.cloud;

    const forecastDayi = await getWeather.data.forecast.forecastday[0].hour;
    const forecastDayii = await getWeather.data.forecast.forecastday[1].hour;


    // SUNRISE SUNSET API RESPONSE
    info = {
      latitude: req.query.lat,
      longitude: req.query.long,
      sunriseUTC,
      sunsetUTC,
      tz_id: tzID,
      localtime_epoch: localTimeEpoch,
      localtime_string: localTimeString,
      current_text: currConditionTxt,
      current_code: currConditionCode,
      current_cloud: currCloud,
      forecastDayi: forecastDayi,
      forecastDayii: forecastDayii,
    };


    functions.logger.log("Sunrise sunset based on location", await info);
    // res.set('Access-Control-Allow-Origin', '*');
    // res.set('Vary: origin');
    res.status(200).send(await info);
  });
});
