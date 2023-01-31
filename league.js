'use strict'
let div_id = document.getElementById('champ')
let image_id = document.getElementById('champPic')
let p_champ = document.getElementById('champName')
let opgg_url = 'https://www.op.gg/champions/'



let json_url = './es_AR/champion.json'
let championsData = await fetch(json_url) // Termina esto y devuelve la lista de campiones
    .then(response => response.json())
    .then(champions => champion_data(champions.data))
    
let randomChamp

/* Boton para obtener campeon random */
let getChampButton = document.getElementById('randomChamp')
getChampButton.addEventListener('click', e =>{
    console.log('click')
    let champName = getRandomChamp(championsData)
    let image = '../img/champion/tiles/'+ champName +'_0.jpg' //Asi puedo cambiar la imagen del champion
    document.getElementById('champName').innerHTML = champName
    image_id.src = image
    div_id.style.display = 'block'
    randomChamp = champName

    redirect(champName) // Cambia el HREF del a para que dirija por imagen a la direccion url
})

/* Boton para obtener dos lineas aleatorias */
const lines = ['Top', 'Jungla', 'Mid', 'Adc', 'Soporte', 'Autofill']
let getRandomLines = document.getElementById('selectLines')
getRandomLines.addEventListener('click', e =>{
    let randomLines = getTwoRandomLines(lines)
})


/* Funciones  */
function getRandomChamp(champs_id){
    let random_int = getRandomInt(0,champs_id.length-1)
    let champName = champs_id[random_int]
    return champName
}

function champion_data(data){
    return Object.keys(data) // Devuevle todas las keys 
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getTwoRandomLines(array_lines){
    let auxArray = array_lines
    let randomNumber = getRandomInt(0, auxArray.length)
    let firstLine = auxArray[randomNumber]
    auxArray.pop()
    
    if (firstLine == 'Autofill') return [firstLine,null]

    let secondRandomNumber 

}

function redirect(champName){
    let changeHref = document.getElementById('redirectOpgg')
    let champLowerCase = String(champName).toLowerCase()
    changeHref.href = opgg_url+champLowerCase
}
