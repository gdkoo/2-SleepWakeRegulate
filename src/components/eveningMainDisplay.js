import {getDisplayValues} from '../calculation/compareToRange.js'
export default function eveningMainDisplay (getDisplayValues) {

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
	
	// If it's past sunset, don't show time to leave. Instead, provide recommendation for evening walk. 
	const eveningTimeText = document.querySelector('.time');
	eveningTimeText.innerHTML = ``;

	const maxTimeEl = document.querySelector(".max-time");
	maxTimeEl.innerHTML = getDisplayValues.maxTime;

	const minTimeEl = document.querySelector(".min-time");
	minTimeEl.innerHTML = getDisplayValues.minTime;

	const eveningMessageEl = document.querySelector(".past-sunset");
	eveningMessageEl.innerHTML = getDisplayValues.eveningMessage;
	// console.log(`this is $eveningMessage:${getDisplayValues.eveningMessage} and displayableTime shouldn't show: ${getDisplayValues.displayableTime}`);
}
