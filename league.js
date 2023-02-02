'use strict'
let champDiv = document.getElementById('champ')
let linesDiv = document.getElementById('linesSelector')

let image_id = document.getElementById('champPic')
let p_champ = document.getElementById('champName')

let opgg_url = 'https://www.op.gg/champions/'


let json_url = './es_AR/champion.json'
let championsData = await fetch(json_url) // Termina esto y devuelve la lista de campeones
    .then(response => response.json())
    .then(champions => champion_data(champions.data))
    
let randomChamp

/* Boton para obtener campeon random */
let getChampButton = document.getElementById('randomChamp')
getChampButton.addEventListener('click', e =>{
    let champName = getRandomChamp(championsData)
    randomChamp = champName
    display(champName) // Muestra todo
    redirect(champName) // Cambia el HREF del a para que dirija por imagen a la direccion url
})

/* Boton para obtener dos lineas aleatorias */
const lines = ['Top', 'Jungla', 'Mid', 'Adc', 'Soporte', 'Autofill']

let getRandomLines = document.getElementById('selectLines')
getRandomLines.addEventListener('click', e =>{
    let randomLines = getTwoRandomLines(lines)

    let firstLine = randomLines[0]
    let secondLine = randomLines[1]

    let divChildNodes = Object.values(linesDiv.children)


    if(linesDiv.childNodes.length == 9){ 
        replaceElement(firstLine, 'first')
        replaceElement(secondLine, 'second')
    }
    
    else{
        displayLine(firstLine)
        if(secondLine != null ){
            displayLine(secondLine)
       }
}


    /*for(let line in randomLines){
        let element = randomLines[line]
        console.log(linesDiv.childNodes.length)
        if(linesDiv.childNodes.length > 8){
            console.log('Ya estan creados')
            console.log(linesDiv.childNodes)
        }
        else{
            if(element != null){
                let p = document.createElement('p')
                p.innerHTML = element
    
                let image = document.createElement('img')
                let elementLC = element.toLowerCase()  
                image.src = './img/lines_icon/'+elementLC+'Icon.png'
                image.style.height = '100px';
                image.style.width = '100px'
    
                linesDiv.appendChild(p)
                linesDiv.appendChild(image)
            } 
        }
       
        */
        if(linesDiv){}
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
    let randomNumber = getRandomInt(0, auxArray.length -1)
    let firstLine = auxArray[randomNumber]
    
    if (firstLine == 'Autofill') return [firstLine,null] // Chequea que sea directamente autofill
    
    auxArray.splice(randomNumber,1)

    let secondRandNumber = getRandomInt(0,auxArray.length -1)
    let secondLine = auxArray[secondRandNumber]

    return [firstLine, secondLine]

}

function redirect(champName){
    let changeHref = document.getElementById('redirectOpgg')
    let champLowerCase = String(champName).toLowerCase()
    changeHref.href = opgg_url+champLowerCase
}

function display(champName){
    let image = '../img/champion/tiles/'+ champName +'_0.jpg' //Asi puedo cambiar la imagen del champion
    document.getElementById('champName').innerHTML = champName
    image_id.src = image
    champDiv.style.display = 'block'
}

function createElement(element){
    let p = document.createElement('p')
    let img = document.createElement('img')

    p.innerHTML = element

    let elementLC = element.toLowerCase()
    img.src = './img/lines_icon/'+elementLC+'Icon.png'
    img.style.height = '100px';
    img.style.width = '100px'

    return [p,img]
}


function displayLine(element){
    let data = createElement(element)
    linesDiv.appendChild(data[0])
    linesDiv.appendChild(data[1])

    
}

function replaceElement(element, value){
    let data = createElement(element)

    if(value == 'first'){
        linesDiv.replaceChild(data[0], linesDiv.childNodes[5])
        linesDiv.replaceChild(data[1], linesDiv.childNodes[6])
    }

    else{
        linesDiv.replaceChild(data[0], linesDiv.childNodes[7])
        linesDiv.replaceChild(data[1], linesDiv.childNodes[8])
    }
}
