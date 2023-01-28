'use strict'
let div_id = document.getElementById('champ')
let image_id = document.getElementById('champPic')

let json_url = './es_AR/champion.json'
fetch(json_url)
    .then(response => response.json())
    .then(data => data)
    .then(champions => {
        return champion_data(champions.data)
    })
    .then(all_champs_id => {
        let random_int = getRandomInt(0,161)
        let champName = all_champs_id[random_int]
        let imageUrl = '../img/champion/tiles/'+champName+'_0.jpg' //Asi puedo cambiar la imagen del champion
        maquetado(champName, imageUrl)
        
    })


function champion_data(data){
    let str_champs = ''

    for( let element in data){
        str_champs = str_champs+element+','; //Esto lo hago para poder tener todos juntos separados por una coma
    }

    let all_champs = str_champs.split(',')
    return all_champs
}

function randomChamp(data_list){
    console.log(data_list)
    
    console.log(random_int)
    return 
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maquetado(champName, image){
    document.getElementById('champName').innerHTML = champName
    let buttonPressed = document.getElementById('button')
    buttonPressed.addEventListener('click', ()=>{
        div_id.style.display = 'block'
        image_id.src = image
        buttonPressed.disabled = true
})

function refreshPage(){
    let reload_button = document.getElementById('reload')
    reload_button.addEventListener('click', location.reload())
}

}