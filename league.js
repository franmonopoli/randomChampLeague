'use strict'
let champDiv = document.getElementById('champ')

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

    let linesDiv = document.getElementById('linesSelector') // Solo se usa aca
    let button = document.getElementById('selectLines')
    button.style.transform = 'translateY(0px)'

    let divAux = document.createElement('div')
    divAux.setAttribute('style',"flex-direction: column;")
    divAux.setAttribute('id', 'linesSelector') // Es para que se pise cuando lo use

    let h2 = document.createElement('h2')
    h2.innerHTML = 'Lineas elegidas:'

    divAux.append(h2)

    randomLines.forEach( (line)=>{
        console.log(line)
        if(line){

            let br = document.createElement('br')
            let div = document.createElement('div')
            div.className = 'divsLines'
            div.style.cssText = `
                display: block;
                min-height: 0px;
            `
            let img = document.createElement('img')
            let h2 = document.createElement('h2')
            
            h2.innerHTML = line

           
            let lineLC = line.toLowerCase()  
            img.src = './img/lines_icon/'+lineLC+'Icon.png'
            img.style.height = '100px';
            img.style.width = '100px'

            div.appendChild(h2)
            div.appendChild(br)
            div.appendChild(img)
            
        
            divAux.appendChild(div) // Asi tengo los dos dentro del div
        }
        
    })
        linesDiv.replaceWith(divAux)
        linesDiv.display = 'block'

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
    let auxArray = [...array_lines] // Forma de copiar y no usar el mismo array
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
    let button = document.getElementById('randomChamp')
    button.style.transform = 'translateY(0px)'
    let image = '../img/champion/tiles/'+ champName +'_0.jpg' //Asi puedo cambiar la imagen del champion
    document.getElementById('champName').innerHTML = champName
    image_id.src = image
    champDiv.style.display = 'block'
}
