import {currentWeatherData} from '../api/index.js';
import getDisplayValues from '../calculation/compareToRange.js'

export default function sunsetMainDisplay (getDisplayValues){

	//DO: remove existing tooLate Class
	document.getElementById("too-late1").className =
	   document.getElementById("too-late1").className.replace
	      ( /(?:^|\s)too-late-time(?!\S)/g , '' );
	document.getElementById("too-late2").className =
	   document.getElementById("too-late2").className.replace
	      ( /(?:^|\s)too-late-results(?!\S)/g , '' );
	
	document.getElementById("too-late3").className =
	   document.getElementById("too-late3").className.replace
	      ( /(?:^|\s)too-late-msg(?!\S)/g , '' );
	

	const currentTime = currentWeatherData.localTimeString.slice(11);
	let timeText = document.querySelector('.time');
	if (currentTime == getDisplayValues.displayableTime) {
		timeText = document.querySelector('.blinkTime');
	}

	else {
		timeText.innerHTML = `${getDisplayValues.displayableTime}pm`;
	}

	const maxTimeEl = document.querySelector(".max-time");
	maxTimeEl.innerHTML = getDisplayValues.maxTime;

	const minTimeEl = document.querySelector(".min-time");
	minTimeEl.innerHTML = getDisplayValues.minTime;
};