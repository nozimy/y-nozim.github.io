window.addEventListener('devicelight', (e) => {
	console.log(`${e.value} lux`);
});

window.addEventListener('offline', networkStatus);
window.addEventListener('online', networkStatus);
function networkStatus(e){
	console.log(e.type);
}

navigator.vibrate(1000);
navigator.vibrate([400, 300, 300, 200, 500]);
navigator.vibrate(0);

window.addEventListener('deviceorientation', (e)=> {
	console.log('Gamma', e.gamma);
	console.log('Beta', e.beta);
	console.log('Alpha', e.alpha);
});

let block = document.querySelector('.description');

window.addEventListener('deviceorientation', (e) => {
	let tiltLR = e.gamma;
	let tiltFB = e.beta;

	block.style.transform = `rotate(${tiltLR}deg) rotate3d(1,0,0, ${tiltFB * -1}deg)`;
});

navigator.getBattery().then((battery) => {
	batteryHandle(battery);

	battery.addEventListener('levelChange', () => {
		batteryHandle(battery);
	});
	battery.addEventListener('chargingchange', () => {
		batteryHandle(battery);
	})
});

function batteryHandle(battery) {
	console.log(`${battery.level * 100}%`);
	if (battery.level > 0.2 || battery.charging ) {
		let batteryAlert = document.querySelector('.batteryAlert');
		batteryAlert.style.visibility = 'hidden';
		return;
	}

	let batteryAlert = document.querySelector('.batteryAlert');
	let batteryLevel = document.querySelector('.batteryLevel');
	batteryLevel.textContent = `${battery.level * 100}%`;
	batteryAlert.style.visibility = 'visible';
}
