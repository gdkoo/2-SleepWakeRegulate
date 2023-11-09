import dailyWalkLogo from '../images/logo.png';
import getUpText from '../images/getupandgo.png';
import garden from "../images/taihanggarden.jpg";
import cloudSky from '../images/cloud-sky.jpg';
import sunsetCharles from '../images/yellow-sunset-charles.jpg';

export default function setUpLazyLoad () {
	//Title Page: Set Logo Image 
	var logoImg = document.createElement("img");
	logoImg.setAttribute("data-src", `${dailyWalkLogo}`);
	logoImg.width = "235";
	logoImg.height = "105";
	logoImg.className = "logo";
	document.querySelector('.f1-child1').appendChild(logoImg);

	// //Title Page: Set 'at' Phrase
	// var atText = document.querySelector('.f1-innerchild1');
	// atText.innerHTML = "at";

	//Set Getup and Go Image (Move on Scroll Property)
	var getUpImg = document.createElement("img");
	getUpImg.setAttribute("data-src", `${getUpText}`);
	getUpImg.width = "355";
	getUpImg.height = "165";
	getUpImg.className = "getup";
	document.querySelector('.f1-child1').appendChild(getUpImg);

	//Set Garden Image 
	var taiHangImg = document.createElement("img");
	taiHangImg.setAttribute("data-src", `${garden}`);
	taiHangImg.setAttribute("max-width", "auto");
	taiHangImg.setAttribute("padding", "30");
	taiHangImg.style.height = "95%";
	taiHangImg.className = "f4-child1"; 
	document.querySelector('.f4-parent').appendChild(taiHangImg);

	//set up lazy load for images in HTML 
	const images = document.querySelectorAll("[data-src]");

	const lazyLoadHTML = target => {
		const io = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					const img = entry.target;
					const src = img.getAttribute('data-src');

					img.setAttribute('src', src);
					observer.disconnect;
				}
			})
		})
		io.observe(target)
	};
	images.forEach(lazyLoadHTML);

	var backgroundimages = document.querySelector('.f3-child1');
	const lazyLoadCSS = target => {
		const io = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.disconnect;
				}
			})
		})
		io.observe(target);
	}
	lazyLoadCSS(backgroundimages);
}
