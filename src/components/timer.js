import { timerMaxLeft } from './index.js';

export default class Timer {
	constructor (root) {
		root.innerHTML = Timer.getHTML();

		this.element = {
			minutes: root.querySelector(".timer-base__minutes"),
			seconds: root.querySelector(".timer-base__seconds"),
			control: root.querySelector(".timer-bttn__control"),
			reset: root.querySelector(".timer-bttn__reset")		
		 };

		this.interval = null;
		this.remainingSeconds = timerMaxLeft*60;

		this.element.control.addEventListener("click", () => {
			if (this.interval == null) {
				this.start()
			} else {
				this.stop()
			}
		});

		this.element.reset.addEventListener("click", () => {
			this.remainingSeconds = timerMaxLeft*60;
			this.updateInterfaceTime();
			this.updateInterfaceControls();
		})
	}

	updateInterfaceTime () {
		//convert time parameter to minutes, rounded to closest integer less than or equal to result  
		const minutes = Math.floor(this.remainingSeconds / 60);
		//for purpose of our parameter, seconds will always be 0, but this is useful in case there is an outlier. 
		let seconds = this.remainingSeconds % 60;
		this.element.minutes.textContent = minutes.toString().padStart(2, "0");
		this.element.seconds.textContent = seconds.toString().padStart(2, "0");
	}

	updateInterfaceControls () {
		if (this.interval == null) {
			this.element.control.innerHTML = `<span class="material-symbols-rounded"> play_arrow</span>`;
			this.element.control.classList.add("timer-bttn__start");
			this.element.control.classList.remove("timer-bttn__stop");
		}
		else {
			this.element.control.innerHTML = `<span class="material-symbols-rounded"> pause</span>`;
			this.element.control.classList.add("timer-bttn__stop");
			this.element.control.classList.remove("timer-bttn__start");
		}
	}

	start() {
		if (this.remainingSeconds == 0) {
			return
		};
		this.interval = setInterval(() => {
			this.remainingSeconds --;
			this.updateInterfaceTime()

			if (this.remainingSeconds == 0) {
				this.stop();
			};
		}, 1000);

		this.updateInterfaceControls();
	}

	stop() {
		clearInterval(this.interval);

		this.interval = null;

		this.updateInterfaceControls();
	}

	startTimer() {
		//so that when we don't call startTimer(), it resets. Might delete later
		this.interval = setInterval(() => {
			timePassed = timePassed += 1;
			timeLeft = timerMaxSeconds - timePassed;
			document.getElementById("timer-base-label").innerHTML = formatTime(timeLeft);			
		}, 1000);
	};

	static getHTML () {
		return `
      	<div class= "timer-element center-align">
			<div class="timer-base center-align">
				<svg class="timer-base-svg" viewbox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<g class="timer-base-circle"> 
						<circle class="timer-base-path-elapsed" cx="50" cy="50" r="45"/>
					</g>
				</svg>
				<div class="timer-base__label">
					<span class= "timer__part timer-base__minutes"> ${timerMaxLeft} </span>
					<span class = "timer__part">:</span>
					<span class="timer__part timer-base__seconds"> 00 </span>
				</div>
				<button type="button" class="timer-bttn timer-bttn-left timer-bttn__control timer-bttn__start">
		        <span class="material-symbols-rounded"> play_arrow </span>
		      	</button>
				<button type="button" class="timer-bttn timer-bttn-right timer-bttn__reset"> 
				  <span class="material-symbols-rounded"> replay </span>
				</button>  
				</div>
		</div>
	  `;
	}
}

      