
const burgerBtn = document.getElementById('burgerBtn')
const navLinks = document.getElementById('navLinks')
const pagination = document.getElementById("pagination")
let array = []
const elementsParPage = 8
let currentPage = 1

burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})

function getArray() {
    return array
}

function setArray(value) {
    array = value
}

// Fonction permettant de récupérer les données du JSON animals
async function animalsResearch() {
    const response = await fetch('../assets/animals.json')
    array = await response.json()
}

//Fonction permettant de calculer le nombre de page sur le site selon le nombre de cards (elementsParPage) que l'on veut avoir par
//page
function nbrPage(elementsParPage) {
    const totalPages = Math.ceil(array.length / elementsParPage)
    return totalPages
}


//Fonction permettant d'afficher un certain nombre de card d'animaux selon la page sur laquelle on se trouve
function callDataPage(page) {
    const debut = (page * elementsParPage) - elementsParPage
    const fin = page * elementsParPage
    const elementsActuels = array.slice(debut, fin)
    displayPhotosAdopt(elementsActuels)
    return elementsActuels
}


//Fonction permettant d'afficher le nombre de boutons selon le nombre total de pages qu'il doit y avoir dans le site
function addNbrBtn(totalPages) {
    pagination.innerHTML = ""

    for (let i = 1; i <= totalPages; i++) {
        let btnNumber = document.createElement('button')
        btnNumber.innerText = i
        btnNumber.classList.add('button')
        btnNumber.id = i

        btnNumber.addEventListener("click", (event) => {
            const page = parseInt(event.target.id)
            currentPage = page

            callDataPage(page)

            let allBtns = document.getElementsByClassName('button')
            for (let btn of allBtns) {
                btn.classList.remove('active')
            }

            window.scrollTo({
            top: 0,
            behavior: "smooth"
            })

            event.target.classList.add('active')
        })

         

        pagination.appendChild(btnNumber)
    }

    if (pagination.firstChild) {
        pagination.firstChild.classList.add('active')
    }
}


async function nextBtn() {

    const nextBtn = document.createElement('button')
    nextBtn.innerText = "Suivant »"
    nextBtn.classList.add("nextBtn")
    pagination.appendChild(nextBtn)

    nextBtn.addEventListener("click", () => {
    const totalPages = nbrPage(elementsParPage) 

    if (currentPage < totalPages) {
        currentPage++
        callDataPage(currentPage)

        let allBtns = document.getElementsByClassName('button')
        for (let btn of allBtns) {
            btn.classList.remove('active')
        }
        const btnActif = document.getElementById(currentPage)
        if (btnActif) btnActif.classList.add('active')

        window.scrollTo({ top: 0, behavior: "smooth" })
    }
})
}



// Fonction permettant de créer des cards, chaque card représente un animal avec sa photo et ses photos. Les informations 
// sont récupérés grâce à un tableau (animals)
function displayPhotosAdopt(array) {
    const flex = document.getElementById('flex-card-adoption')
    flex.innerText = ""

    array.forEach((animal) => {
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

        const meet = document.createElement("btn")
        meet.innerText = "Rencontrer"
        meet.classList.add("btnMeetAdopt")

        cardText.appendChild(type)
        cardText.appendChild(h2)
        cardText.appendChild(age)
        cardText.appendChild(city)
        cardText.appendChild(description)
        divMeet.appendChild(meet)

        meet.addEventListener("click", () => {
            console.log(`${animal.name}, ${animal.type}`)
        })

    })
}


// Fonction permettant de gérer plusieurs cas d'affichage des cards des animaux au chargement de la page Adopt
async function startingAdoptPage() {
    let reasearchQuery = localStorage.getItem('quantityAnimalsFind')
    await animalsResearch()

    if (reasearchQuery > 0) {
        let found = (reasearchQuery)
        let inputTypeAnimals = document.getElementById('grid-animaux-trouves')
        inputTypeAnimals.innerText = `${found} animal trouvé`
        let filteredAnimalsData = localStorage.getItem('array')
        array = JSON.parse(filteredAnimalsData)
        const dataTotalPage = nbrPage(elementsParPage)
        addNbrBtn(dataTotalPage)
        let btn1 = document.getElementById('1')
        btn1.classList.add('active')
        callDataPage(1)
        nextBtn()

    } else if (reasearchQuery == 0) {
        let found = (reasearchQuery)
        let inputTypeAnimals = document.getElementById('grid-animaux-trouves')
        inputTypeAnimals.innerText = `${found} animal trouvé`
        const dataTotalPage = nbrPage(elementsParPage)
        addNbrBtn(dataTotalPage)
        let btn1 = document.getElementById('1')
        btn1.classList.add('active')
        callDataPage(1)
        nextBtn()

    } else {
        const dataTotalPage = nbrPage(elementsParPage)
        callDataPage(1)
        addNbrBtn(dataTotalPage)
        let btn1 = document.getElementById('1')
        btn1.classList.add('active')
        nextBtn()
    }

    localStorage.removeItem('array')
    localStorage.removeItem('quantityAnimalsFind')
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
        await animalsResearch()
        array = array.filter(animal => animal.type === typeAnimals && animal.city === cityValue)
        let quantityTypeAnimalsFind = array.length

        if (quantityTypeAnimalsFind > 1) {
            inputTypeAnimals.innerText = `${quantityTypeAnimalsFind} animaux trouvés`
        } else {
            inputTypeAnimals.innerText = `${quantityTypeAnimalsFind} animal trouvé`
        }

        const dataTotalPage = nbrPage(elementsParPage)
        addNbrBtn(dataTotalPage)
        callDataPage(1)
        nextBtn()
    }
})



startingAdoptPage()

export { choice_select, animalsResearch, getArray, setArray }