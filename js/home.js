import { choice_select, animalsResearch} from './adopt.js'

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

    let listAnimals = await animalsResearch()
    let filteredAnimals = listAnimals.filter(animal => animal.type === typeAnimals && animal.city === cityValue)

    let quantityTypeAnimalsFind = filteredAnimals.length
    console.log(quantityTypeAnimalsFind)
    localStorage.setItem('filteredAnimals', JSON.stringify(filteredAnimals))
    localStorage.setItem('quantityAnimalsFind', quantityTypeAnimalsFind)
    window.location.href = `/home/adopt.html?found=${quantityTypeAnimalsFind}`
    
})

