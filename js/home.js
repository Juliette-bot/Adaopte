const btnResearch = document.getElementById('btn-research')

btnResearch.addEventListener('click', async (e) => {
    e.preventDefault()
    const city = document.getElementById('localisation')
    const inputTypeAnimals = document.getElementById('grid-animaux-trouvés')

    let typeAnimals = choice_select()
    console.log(typeAnimals)
    let cityValue = city.value

    let listAnimals = await animalsResearch()
    let filteredAnimals = listAnimals.filter(animal => animal.type === typeAnimals && animal.city === cityValue)

    let quantityTypeAnimalsFind = filteredAnimals.length
    console.log(quantityTypeAnimalsFind)
    localStorage.setItem('filteredAnimals', JSON.stringify(filteredAnimals))
    localStorage.setItem('quantityAnimalsFind', quantityTypeAnimalsFind)
    if (quantityTypeAnimalsFind > 1){
        window.location.href = `/home/adopt.html?found=${quantityTypeAnimalsFind}`
    } else {
       window.location.href = `/home/adopt.html?found=${quantityTypeAnimalsFind}`
    }
    
})

async function animalsResearch(){
    const response = await fetch ('/assets/animals.json')
    const listAnimals = await response.json()
    return listAnimals
}

function choice_select(){
    const select = document.getElementById('select-adopt')
    const choice = select.selectedIndex
    const choice_selected = select.options[choice].value
    return choice_selected
}