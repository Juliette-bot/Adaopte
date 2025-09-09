
const burgerBtn = document.getElementById('burgerBtn')
const navLinks = document.getElementById('navLinks')

burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    navLinks.classList.toggle('active')
})

// Fonction permettant de créer des cards, chaque card représente un animal avec sa photo et ses photos. Les informations 
// sont récupérés grâce à un tableau (animals)
function displayPhotosAdopt(animals) {

    animals.forEach((animal) => {

    //const animalsOnScreen = animals.slice(0, 8)
    const flex = document.getElementById('flex-card-adoption')
    //flex.innerText = ""


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

// Fonction permettant de gérer plusieurs cas d'affichage des cards des animaux au chargement de la page Adopt
async function startingAdoptPage() {
    let reasearchQuery = localStorage.getItem('quantityAnimalsFind')

    if (reasearchQuery > 0) {
        let found = (reasearchQuery)
        let inputTypeAnimals = document.getElementById('grid-animaux-trouves')
        inputTypeAnimals.innerText = `${found} animal trouvé`
        let filteredAnimalsData = localStorage.getItem('filteredAnimals')
        let animals = JSON.parse(filteredAnimalsData)
        displayPhotosAdopt(animals)
        const meet = document.createElement("a")
        meet.innerText = "Rencontrer"
        meet.classList.add("btnMeetAdopt");


        cardText.appendChild(type);
        cardText.appendChild(h2);
        cardText.appendChild(age);
        cardText.appendChild(city);
        cardText.appendChild(description);

        divMeet.appendChild(meet);



    };
}
displayPhotosAdopt()


function addNbrBtn() {
    const limite = 8
    const item = document.querySelector('.cardAdopt')
    for (let item = 0; item < limite; item++) {
        displayPhotosAdopt()
    }

    for (let i = 1; i <= page; i++) {
        console.log('btn')
        const btnNumber = document.createElement('button')
        btnNumber.innerText = i
        pagination.appendChild(btnNumber)
    }



}
//addNbrBtn()

function nextBtn() {

    const nextBtn = document.createElement('button')
    nextBtn.innerText = "Suivant »"
    pagination.appendChild(nextBtn)

    nextBtn.addEventListener('click', (btn) => {
        if (currentPage < page) {
            currentPage++
            console.log(currentPage)

        }

        if (currentPage === 2) {
            console.log(dataSecondePage)
        }
    })
}

//nextBtn()



const reasearchQuery = localStorage.getItem('quantityAnimalsFind')
if (reasearchQuery !== null) {
    const found = (reasearchQuery)
    const inputTypeAnimals = document.getElementById('grid-animaux-trouvés')
    inputTypeAnimals.innerText = `${found} animal trouvé`



}
const filteredAnimalsData = localStorage.getItem('filteredAnimals')

if (filteredAnimalsData) {
    const animals = JSON.parse(filteredAnimalsData)
    const container = document.getElementById('flex-card-adoption')

    } else if (reasearchQuery == 0) {
        let found = (reasearchQuery)
        let inputTypeAnimals = document.getElementById('grid-animaux-trouves')
        inputTypeAnimals.innerText = `${found} animal trouvé`
        let response = await fetch("/assets/animals.json");
        let animals = await response.json();
        displayPhotosAdopt(animals)

    } else {
        let animals = await animalsResearch()
        displayPhotosAdopt(animals)
    }

    localStorage.removeItem('filteredAnimals')
    localStorage.removeItem('quantityAnimalsFind')


// Fonction permettant de récupérer les données des animaux
async function animalsResearch() {
    const response = await fetch('../assets/animals.json')
    const listAnimals = await response.json()
    return listAnimals
}

// Fonction permettant de récupérer le type d'animal choisi dans la liste déroulante de la section "recherche"
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
    let cityRaw = city.value
    
    if (typeAnimals == "") {
        inputTypeAnimals.innerText = "Merci de choisir une ville"
    } else if ((cityRaw == "")) {
        inputTypeAnimals.innerText = "Merci de choisir un type d'animal"
    } else {
        let cityValue = cityRaw[0].toUpperCase() + cityRaw.slice(1)
        let listAnimals = await animalsResearch()
        let filteredAnimals = listAnimals.filter(animal => animal.type === typeAnimals && animal.city === cityValue)
        let quantityTypeAnimalsFind = filteredAnimals.length

        if (quantityTypeAnimalsFind > 1) {
            inputTypeAnimals.innerText = `${quantityTypeAnimalsFind} animaux trouvés`
        } else {
            inputTypeAnimals.innerText = `${quantityTypeAnimalsFind} animal trouvé`
        }

        displayPhotosAdopt(filteredAnimals)
    }


})

startingAdoptPage()

export {choice_select, animalsResearch}