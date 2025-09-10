import { choice_select, animalsResearch, setArray, getArray} from './adopt.js'

const btnResearch = document.getElementById('btn-research')

btnResearch.addEventListener('click', async (e) => {
    e.preventDefault()
    const city = document.getElementById('localisation')

    let typeAnimals = choice_select()
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

