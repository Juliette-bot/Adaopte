
const burgerBtn = document.getElementById('burgerBtn')
const navLinks = document.getElementById('navLinks')

burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})


function displayPhotosAdopt(animals) {

    animals.forEach((animal) => {
        const flex = document.getElementById('flex-card-adoption')

        const card = document.createElement("div")
        card.classList.add("cardAdopt")
        flex.appendChild(card)

        const cardPhoto = document.createElement("div")
        cardPhoto.classList.add("cardPhotoAdopt")
        cardPhoto.style.backgroundImage = `url(${animal.imageUrl})`
        cardPhoto.style.backgroundPosition = `center`
        cardPhoto.style.backgroundSize = `cover`
        cardPhoto.alt = animal.name
        card.appendChild(cardPhoto)

        const cardText = document.createElement("div")
        cardText.classList.add("cardTextAdopt")
        card.appendChild(cardText)

        const divMeet = document.createElement('div')
        divMeet.classList.add('divMeetAdopt')
        card.appendChild(divMeet)

        const type = document.createElement("p")
        type.innerText = animal.type
        type.classList.add("textCardAdopt")

        const h2 = document.createElement("h2")
        h2.innerText = animal.name
        h2.classList.add("nameAdopt")

        const age = document.createElement("p")
        age.innerText = animal.age
        age.classList.add("textCardAdopt")

        const city = document.createElement("p")
        city.innerText = animal.city
        city.classList.add("textCardAdopt")

        const description = document.createElement("p")
        description.innerText = animal.description
        description.classList.add("descriptionCardAdopt")

        const meet = document.createElement("a")
        meet.innerText = "Rencontrer"
        meet.classList.add("btnMeetAdopt")


        cardText.appendChild(type)
        cardText.appendChild(h2)
        cardText.appendChild(age)
        cardText.appendChild(city)
        cardText.appendChild(description)

        divMeet.appendChild(meet)

    })
}


async function startingAdoptPage(){
    let reasearchQuery = localStorage.getItem('quantityAnimalsFind')


    if (reasearchQuery > 0) {
        let found = (reasearchQuery)
        let inputTypeAnimals = document.getElementById('grid-animaux-trouves')
        inputTypeAnimals.innerText = `${found} animal trouvé`
        let filteredAnimalsData = localStorage.getItem('filteredAnimals')
        let animals = JSON.parse(filteredAnimalsData)
        displayPhotosAdopt(animals)

    } else if (reasearchQuery == 0) {
        let found = (reasearchQuery)
        let inputTypeAnimals = document.getElementById('grid-animaux-trouves')
        inputTypeAnimals.innerText = `${found} animal trouvé`
        let response = await fetch("/assets/animals.json");
        let animals = await response.json();
        displayPhotosAdopt (animals)

    } else {
        let response = await fetch("/assets/animals.json");
        let animals = await response.json();
        displayPhotosAdopt (animals)
    }

    localStorage.removeItem('filteredAnimals')
    localStorage.removeItem('quantityAnimalsFind')
}


async function animalsResearch() {
    const response = await fetch('../assets/animals.json')
    const listAnimals = await response.json()
    return listAnimals
}

function choice_select() {
    const select = document.getElementById('select-adopt')
    const choice = select.selectedIndex
    const choice_selected = select.options[choice].value
    return choice_selected

}

const btnResearch = document.getElementById('btn-research')

btnResearch.addEventListener('click', async (e) => {
    let flex = document.getElementById('flex-card-adoption')
    flex.innerText = ""

    e.preventDefault()
    const city = document.getElementById('localisation')
    const inputTypeAnimals = document.getElementById('grid-animaux-trouves')

    let typeAnimals = choice_select()
    let cityValue = city.value

    let listAnimals = await animalsResearch()
    let filteredAnimals = listAnimals.filter(animal => animal.type === typeAnimals && animal.city === cityValue)

    let quantityTypeAnimalsFind = filteredAnimals.length
    if (quantityTypeAnimalsFind > 1) {
        inputTypeAnimals.innerText = `${quantityTypeAnimalsFind} animaux trouvés`
    } else {
        inputTypeAnimals.innerText = `${quantityTypeAnimalsFind} animal trouvé`
    }
    
    displayPhotosAdopt(filteredAnimals)
})


startingAdoptPage()
