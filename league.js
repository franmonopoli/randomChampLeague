'use strict';
let champDiv = document.getElementById('champ');
let p_champ = document.getElementById('champName');

let opgg_url = 'https://www.op.gg/champions/';

let json_url = './es_AR/champion.json';
let championsData = await fetch(json_url) // Termina esto y devuelve la lista de campeones
	.then((response) => response.json())
	.then((champions) => champion_data(champions.data));

let randomChamp;

/* Boton para obtener campeon random */
let getChampButton = document.getElementById('randomChamp');
getChampButton.addEventListener('click', (e) => {
	let champName = getRandomChamp(championsData);
	randomChamp = champName;
	display(champName); // Muestra todo
	redirect(champName); // Cambia el HREF del a para que dirija por imagen a la direccion url
	let randomChampContainer = document.getElementById('randomChampContainer');
	randomChampContainer.style = null;
	let parent = randomChampContainer.closest('.justify-content-center');
	if (parent) {
		parent.classList.remove('justify-content-center');
		parent.classList.add('justify-content-start');
	}
});

/* Boton para obtener dos lineas aleatorias */
const lines = ['Top', 'Jungla', 'Mid', 'Adc', 'Soporte', 'Autofill'];

let getRandomLines = document.getElementById('selectLines');
getRandomLines.addEventListener('click', (e) => {
	let randomLines = getTwoRandomLines(lines);

	let linesDiv = document.getElementById('lines'); // Solo se usa aca

	let divAux = document.createElement('div');
	divAux.setAttribute('id', 'lines'); // Es para que se pise cuando lo use

	randomLines.forEach((line) => {
		if (line) {
			let div = document.createElement('div');
			div.classList.add('line');
			let img = document.createElement('img');
			let title = document.createElement('div');
			title.classList.add('lineName');
			title.innerHTML = line;

			let lineLC = line.toLowerCase();
			img.src = './img/lines_icon/' + lineLC + 'Icon.png';
			img.style.height = '100px';
			img.style.width = '100px';

			div.append(title);
			div.append(img);
			divAux.append(div); // Asi tengo los dos dentro del div
		}
	});
	linesDiv.replaceWith(divAux);
	let randomLinesContainer = document.getElementById('randomLinesContainer');
	randomLinesContainer.style = null;
	let parent = randomLinesContainer.closest('.justify-content-center');
	if (parent) {
		parent.classList.remove('justify-content-center');
		parent.classList.add('justify-content-start');
	}
});

/* Funciones  */
function getRandomChamp(champs_id) {
	let random_int = getRandomInt(0, champs_id.length - 1);
	let champName = champs_id[random_int];
	return champName;
}

function champion_data(data) {
	return Object.keys(data); // Devuevle todas las keys
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTwoRandomLines(array_lines) {
	let auxArray = [...array_lines]; // Forma de copiar y no usar el mismo array
	let randomNumber = getRandomInt(0, auxArray.length - 1);
	let firstLine = auxArray[randomNumber];

	if (firstLine == 'Autofill') return [firstLine, null]; // Chequea que sea directamente autofill

	auxArray.splice(randomNumber, 1);

	let secondRandNumber = getRandomInt(0, auxArray.length - 1);
	let secondLine = auxArray[secondRandNumber];

	return [firstLine, secondLine];
}

function redirect(champName) {
	let changeHref = document.getElementById('redirectOpgg');
	let champLowerCase = String(champName).toLowerCase();
	changeHref.href = opgg_url + champLowerCase;
}

function display(champName) {
	let image = '../img/champion/tiles/' + champName + '_0.jpg'; //Asi puedo cambiar la imagen del champion
	document.getElementById('champName').innerHTML = champName;
	let image_id = document.getElementById('champImg');
	image_id.src = image;
}
