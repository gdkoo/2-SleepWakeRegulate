<h1 align="center">Welcome to Sleep Wake Regulate 🌆 </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/gdkoo/SleepWakeRegulate#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/gdkoo/SleepWakeRegulate/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/gdkoo/SleepWakeRegulate/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/gdkoo/Sleep Wake Regulate" />
  </a>
</p>

> To help you regulate your sleep wake cycle, Sleep Wake Regulate is a tool that determines the optimal time and duration to go outside for a walk in order to get adequate sunlight exposure. 


### 🏠 [Homepage](https://github.com/gdkoo/SleepWakeRegulate#readme)

### ✨ [Demo](https://dailysunsetwalk.web.app/)

### 📖 Background
Adequate light exposure is a key part of maintaining health and wellbeing. Populations in areas where exposure to the sun is drastically limited during the winter have higher percentages of SAD (seasonal affect disorder). This is a huge portion of the population suffering from symptoms of depression for a quarter of the year. 
Apart from the generalized reduction of sunlight exposure for populations living in certain areas, individual lifestyle limitations such as remote work, overnight shift jobs, and long hours spent indoors from studying or working all can lead to reduced chances of exposure to light throughout the day. Modern day structures for working are not built for having enough sun to maintain a healthy lifestyle. For those who work in offices or other public indoor facilities, light intensity from indoor lighting is not nearly sufficient to meet their daily light needs, despite prolonged exposure.

The impact of long-term insufficient light exposure is far and wide. Insufficient light will lead to diminishing vitamin D levels which translates to a weakened immune system and increases the likelihood of developing fatal diseases later in life such as cancer and Alzheimers. As for the day to day impacts, not having sufficient light exposure as well as having poorly timed light exposure subsequently lead to a dysregulated circadian rhythm. 

The way to counter this global issue is to incorporate structured sun exposure into one’s daily routine. Having a well-regulated circadian rhythm means routinely timed release of cortisol in the early morning and melatonin in the late afternoon, which can enhance wakefulness during the day and ensure sleepiness in the evening. Overall, this leads to significant improvements in mental health, specifically reducing symptoms of depression, anxiety, and concentration. 

Research demonstrates that one of the best courses of treatment for SAD is sufficient light exposure either naturally or supplemented with happy lamps. However since most days are overcast in winter months in the Northern regions, it’s hard enough to find the motivation to or any benefit in going outside.

The solution is to plan for regular sun exposure according to the phases of the sun, with a prescription for how long to be outside to hit 100,000 lumens of sunlight, regardless of whether it is sunny or overcast. Lumens is a measurement for light intensity. Currently, there isn’t an accurate, standardized metric for calculating how many lumens of light a person is exposed to when outdoors. Amount of sun exposure fluctuates based on how much skin is exposed, distance from the sun, and angle of the sun. Nevertheless, borrowing from research from Andrew Huberman, we can follow a general range of sun exposure to get an approximate 100,000 lumens. Huberman’s suggestions are 5-10 minutes on a clear day, 10-20 minutes on a cloudy day, and 30-60 minutes on an overcast day.

### Research Credits and Further Reading
* [**Huberman Lab Master Your Sleep Article**](https://hubermanlab.com/master-your-sleep-and-be-more-alert-when-awake/)
* [**Huberman Lab Sleep Toolkit Video**](https://www.youtube.com/watch?v=h2aWYjSA1Jc&t=1866s)
* [**Lux Guide**](https://security.world/luminous-flux-lux-guide/)
* [**Treatment of SAD**](https://pubmed.ncbi.nlm.nih.gov/8681269/)
* [**Light Exposure and Quality of Life in Women**](https://pubmed.ncbi.nlm.nih.gov/16725207/)
* [**Recommendations for Indoor Light Exposure**](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8929548/)
* [**Measuring Illuminance**](https://www.engineeringtoolbox.com/light-level-rooms-d_708.html)


## About
### Version (1.0.1):
The current version is built for web (preferably Chrome), and is responsive to changes to browser size. 

### Features:
* Displays a suggested time to leave for sunset walk based on hourly forecast.
* Includes a timer with pre-set number of minutes based on weather forecast prediction.

### How it Works:
* Check’s hourly weather forecast and sunset information in user’s location for current day.
* Will find weather forecast of the nearest hour from sunset (ie. If sunset is at 17:40, will check for forecast at 18:00).
* Based on the forecast, will estimate number of minutes to obtain 100,000 lumens of light exposure (based on research and recommendations from Huberman).
* Will suggest the range of time user should be outside to get 100,000 lumens of light (for instance, Huberman suggests 5-10 minutes on a clear day. 
* Provides a timer with pre-inputted time. Timer will display the maximum end of the range in minutes. 
* Will subtract the value on the maximum end of the recommended time range from the exact time of sunset, and display that to users. (ie. Sunset is at 17:40, it’s a bright day so a suggestion of 5-10 minutes outside is sufficient, time to leave on a sunset walk will be calculated by 17:40- 10 minutes, which is 17:30. The user should head out at 17:30).
 
### Use Cases and Expected Outcomes:
These are the following use cases that are accounted for:
1. User makes request before sunset on same day. Display will show the time to leave for a walk around sunset on that same day.
2. User makes request after sunset but early enough that it still makes sense to go outside on the same day (ie. at 7PM, when sunset was at 6:25PM). Page will display text suggesting to go outside immediately. No time will be displayed but timer will display a value based on weather forecast to the nearest hour.
3. User makes request late in the evening (ie. 9PM). No time will be displayed. Text display will inform user to check again tomorrow.

### Urgent Bugs
- [ ] 🐞 Display lags in mobile 
- [ ] 🐞 When user checks at certain time intervals such as 7AM or 9PM, there are errors. Either sunset has not updated for the current day and still reflects information from the previous day, or sunset returns for the following day while the weather forecast returns for the current day. 
- [ ] 🐞 Using the app in different timezones results in inconsistent display of military or non-military time formats. #15
- [ ] 🐞 For the weather and sunset API, the time at which data returned changes from the “current day” to the “next day” are unknown, and subsequently not in sync.

### [Issues](https://github.com/gdkoo/SleepWakeRegulate/issues)


### Other Challenges and Inaccuracies
1. Weather forecasts can differ from actual weather. Given that hourly forecasts are determined around or prior to 12AM of the following day, the difference in the actual weather conditions may be stark.
2. Weather conditons can only be vaguely analyzed from the forecasted weather description (ie. sunny, cloudy, overcast) and cloud coverage which is indicated via a percentage. However, these only provide estimates as to how much light exposure one can expect, but actual measurements will vary. On an "overcast" day that seems cloudy, the estimated lumens of light is approximately 1000 lumens. From my personal experience, I measured 20,000 lumens on my light meter app (which is also proven to be variable in its accuracy) on a typically overcast day. 
Additionally, weather is but one factor that determines light illuminance. Other factors include sun position and elevation. 

### Future Features:
* Fully responsive for mobile (in progress)
* If the user makes the API request late after sunset, provide recommendation for the following day
* Account for if the current weather at time of sunset is different from forecasted weather
* Account for case where cloud coverage percentage contradicts weather condition (ie. light rain condition could imply it's relatively clear, but cloud coverage percentage is 80+, which condition do we use)
* Recommendation for early morning walk based on weather
* Connect camera to app such that you can measure light intensity from your phone camera and get real-time weather information

### Tools
* Webpack
* Firebase


## Support
Reach out to me at: gdk1997@gmail.com 


## Install

```sh
npm install
```

## Test Locally

To serve locally using Webpack
```sh
npm run build
npm run serve
```
1. Upon first use, run build command to bundle files with Webpack into a'main.js' file.
2. Then, serve files in public folder and main.js file to localhost.
3. Project will run on ‘http://localhost:8080'
4. Any subsequent changes to style.css require rebundling to reflect changes when served. Changes to the Javascript source code or HTML are automatically reloaded by Webpack loaders.

## Test Firebase Cloud Functions
**IN PROGRESS**

## Author

👤 **Georgette Koo**

* Website: https://dailysunsetwalk.web.app
* Github: [@gdkoo](https://github.com/gdkoo)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/gdkoo/SleepWakeRegulate/issues). You can also take a look at the contributions document **coming soon**.

## Show your support

Give a ⭐️ if this project helped you!

## Credits
* [Sunrise Sunset API](https://sunrise-sunset.org),
* [Sunrise Sunset API Package](https://github.com/dguo/sunrise-sunset-js/blob/main/README.md)
* [ipapi](https://ipapi.co)
* [weatherapi](https://www.weatherapi.com)

## 📝 License

Copyright © 2023 [Georgette Koo](https://github.com/gdkoo).<br />
This project is [ISC](https://github.com/gdkoo/SleepWakeRegulate/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_