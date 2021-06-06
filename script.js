const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const screen = document.querySelector('.screen');
const audio = document.getElementById('audio');
const silenciar = document.querySelector('.silenciar');
var songPlay = true;

let ticketPrice = +movieSelect.value;//El simbolo de + lo pasa como un numero entero

populateUI();
updateScreen(movieSelect.selectedIndex);
updateSong(movieSelect.selectedIndex);
//Update screen
function updateScreen(index) {

	switch(index){
		case 0:
			screen.style.backgroundImage = 'url(img/Img_EndGame.jpg)';
			break;
		case 1:
			screen.style.backgroundImage = 'url(img/Img_ElPadrino.jpeg)';
			break;
		case 2:
			screen.style.backgroundImage = 'url(img/Img_ToyStory4.jpeg)';
			break;
		case 3:
			screen.style.backgroundImage = 'url(img/Img_ReyLeon.jpeg)';
			break;
		default:
			break;
	}
}

function updateSong(index){
	switch(index){
		case 0:
			audio.src = 'songs/EndGame.mp3';
			break;
		case 1:
			audio.src = 'songs/Godfather.mp3';
			break;
		case 2:
			audio.src = 'songs/ToyStory.mp3';
			break;
		case 3:
			audio.src = 'songs/ReyLeon.mp3';
			break;
		default:
			break;
	}

	if(songPlay){
		audio.play();
	} else {
		audio.pause();
	}
	
}

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	// console.log(seatsIndex);

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from LocalStorage and populate UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if(selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	if(selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//Movie select event
movieSelect.addEventListener('change', e => {
	ticketPrice = e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
	updateScreen(e.target.selectedIndex);
	updateSong(e.target.selectedIndex);
});

container.addEventListener('click', e => {
	if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
		e.target.classList.toggle('selected');

		updateSelectedCount();
	}
});

silenciar.addEventListener('click', e => {
	// console.log(e.target);
	if(songPlay){
		e.target.classList.remove('fa-volume-up');
		e.target.classList.add('fa-volume-off');
		songPlay = false;
		audio.pause();
	} else {
		e.target.classList.remove('fa-volume-off');
		e.target.classList.add('fa-volume-up');
		songPlay = true;
		audio.play();
	}
	
} );

//Initial count and total
updateSelectedCount();

