import {sunsetUTCDate} from '../api/index.js';
import getDisplayValues from '../calculation/compareToRange.js'

export default function tooLateDisplay (getDisplayValues) {

	//DO: add tooLate class
	document.getElementById("too-late1").className += " too-late-time";
	document.getElementById("too-late2").className += " too-late-results";
	document.getElementById("too-late3").className += " too-late-msg";

	console.log(`Oops, error! This is the sunset returning from sunrise-sunset API in UTC: ${sunsetUTCDate}. API returns sunset for tomorrow if it is too late in the evening.`);
	const tooLate = document.querySelector('.too-late-time');
	tooLate.innerHTML = "Looks like it's too late to check. Come back in the morning."

	const tooLateResults = document.querySelector(".too-late-results");
	tooLateResults.innerText = 'go to sleep...';

	const tooLateMsg = document.querySelector(".too-late-msg");
	tooLateMsg.innerText = `we'll be here tomorrow :)`;
};