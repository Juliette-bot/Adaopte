
/*const burgerBtn = document.getElementById('burgerBtn')
const navLinks = document.getElementById('navLinks')

burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})
*/


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
    if (quantityTypeAnimalsFind > 1){
        inputTypeAnimals.innerText = `${quantityTypeAnimalsFind} animaux trouvés`
    } else {
        inputTypeAnimals.innerText = `${quantityTypeAnimalsFind} animal trouvé`
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

