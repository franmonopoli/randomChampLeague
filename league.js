'use strict'
let div_id = document.getElementById('champ')
let image_id = document.getElementById('champPic')
let opgg_url = 'https://www.op.gg/champions/'



let json_url = './es_AR/champion.json'
fetch(json_url)
    .then(response => response.json())
    .then(data => data)
    .then(champions => {
        return champion_data(champions.data)
    })
    .then(all_champs_id => {
        let getChampButton = document.getElementById('button')
        let randomChamp = getRandomChamp(all_champs_id)
        getChampButton.addEventListener('click', ()=>{
             maquetado(randomChamp)
        })
        
        let getChampRunes = document.getElementById('redirect')
        getChampRunes.addEventListener('click', ()=>{
            let champNameLowerCase = randomChamp.toLowerCase()
            window.open(opgg_url+champNameLowerCase)
        }) 
    })


function getRandomChamp(champs_id){
    let random_int = getRandomInt(0,161)
    let champName = champs_id[random_int]
    return champName
}

function champion_data(data){
    let str_champs = ''
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

function maquetado(champName){
    let image = '../img/champion/tiles/'+champName+'_0.jpg' //Asi puedo cambiar la imagen del champion
    document.getElementById('champName').innerHTML = champName
    image_id.src = image
    div_id.style.display = 'block'
}

function refreshPage(){
    let reload_button = document.getElementById('reload')
    reload_button.addEventListener('click', location.reload())
}

