'use strict'
let div_id = document.getElementById('champ')
let image_id = document.getElementById('champPic')
let p_champ = document.getElementById('champName')
let opgg_url = 'https://www.op.gg/champions/'



let json_url = './es_AR/champion.json'
let championsData = await fetch(json_url) // Termina esto y devuelve la lista de campiones
    .then(response => response.json())
    .then(champions => champion_data(champions.data))
    

championsData[0] = 'Aatrox' // No se porque el primero dedvuelve "undefinedAatrox"
let randomChamp = getRandomChamp(championsData)
console.log(championsData)

/* Boton para obtener campeon random */
let getChampButton = document.getElementById('randomChamp')
getChampButton.addEventListener('click', event =>{
    let image = '../img/champion/tiles/'+ randomChamp +'_0.jpg' //Asi puedo cambiar la imagen del champion
    document.getElementById('champName').innerHTML = randomChamp
    image_id.src = image
    div_id.style.display = 'block'

})

/* Boton para obtener las runas campeon */
let getChampRunes = document.getElementById('redirect')
getChampRunes.addEventListener('click', event =>{
    let champNameLowerCase = randomChamp.toLowerCase()
    window.open(opgg_url+champNameLowerCase)
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
    let str_champs;
    for( let element in data){
        str_champs = str_champs+element+','; //Esto lo hago para poder tener todos juntos separados por una coma
    }
    let all_champs = str_champs.split(',')
    return all_champs
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
