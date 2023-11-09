import {getDisplayValues} from '../calculation/compareToRange.js';
import sunsetMainDisplay from './sunsetMainDisplay.js';
import eveningMainDisplay from './eveningMainDisplay.js';
import tooLateDisplay from './tooLateDisplay.js';
import { morningInfo, eveningInfo } from '../calculation/epochWeatherMethods.js';

export async function executeDisplay() {
	try {
		const displayValues = await getDisplayValues();
		timerMaxLeft = await displayValues.timerMaxLeft;
		let displayableTime = await displayValues.displayableTime;
		let eveningMessage = await displayValues.eveningMessage;

		if (!displayValues) {
			tooLateDisplay();
			timerMaxLeft = '00';
			throw new ReferenceError('displayValues object empty. cannot find sunset in hourly weather array. log sunset to debug');
		};
		if (!timerMaxLeft) {
			throw new ReferenceError('timer values undefined');
		}
		if (!displayableTime) {
			//break script
			throw new ReferenceError('displayableTime undefined. see compareToRange.js');
		}
		if (eveningMessage) {
			eveningMainDisplay(displayValues);
		} else {
			sunsetMainDisplay(displayValues);
		}
	} catch (err) {
		alert(`${err.name}:${err.message}`);
		console.log(err);
	} finally {
		console.log(timerMaxLeft);
}

const timerMaxLeft = await executeDisplay();

export {timerMaxLeft};