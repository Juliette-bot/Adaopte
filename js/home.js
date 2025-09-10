import {animalsResearch, setArray, getArray} from './adopt.js'

const btnResearchHome = document.getElementById('btn-research-home')

function choice_select_home() {
    const select = document.getElementById('select-home')
    const choice = select.selectedIndex
    const choice_selected = select.options[choice].value
    return choice_selected
}

btnResearchHome.addEventListener('click', async () => {
    const city = document.getElementById('localisation-home')

    let typeAnimals = choice_select_home()
    let cityRaw = city.value
    if (cityRaw == '') {
        alert('Merci de mettre une ville')
    }
    let cityValue = cityRaw[0].toUpperCase() + cityRaw.slice(1)

    await animalsResearch()
    setArray(getArray().filter(animal => animal.type === typeAnimals && animal.city === cityValue))

    let quantityTypeAnimalsFind = getArray().length
    console.log(quantityTypeAnimalsFind)
    localStorage.setItem('array', JSON.stringify(getArray()))
    localStorage.setItem('quantityAnimalsFind', quantityTypeAnimalsFind)
    window.location.href = `/home/adopt.html?found=${quantityTypeAnimalsFind}`
    
})

