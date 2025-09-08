
const burgerBtn = document.getElementById('burgerBtn')
const navLinks = document.getElementById('navLinks')

burgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active')
})


async function displayPhotosAdopt() {
  const response = await fetch("/assets/animals.json");
  const animals = await response.json();

  animals.forEach((animal) => {
    const flex = document.getElementById('flex-card-adoption')

    const card = document.createElement("div")
    card.classList.add("cardAdopt")
    flex.appendChild(card)

    const cardPhoto = document.createElement("div");
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
displayPhotosAdopt()



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

    if (container) {
        animals.forEach(animal => {
            const animalCard = document.createElement('div')

            animalCard.innerHTML = `
                <h3>${animal.name}</h3>
                <p>Type : ${animal.type}</p>
                <p>Ville : ${animal.city}</p>
                <p>Âge : ${animal.age}</p>
                <img src="${animal.imageUrl}" alt="Photo de ${animal.name}" width="150" />
            `

            container.appendChild(animalCard)
        })
    }


    localStorage.removeItem('filteredAnimals')
    localStorage.removeItem('quantityAnimalsFind')
}

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
    const response = await fetch ('../assets/animals.json')
    const listAnimals = await response.json()
    return listAnimals
}

function choice_select(){
    const select = document.getElementById('select-adopt')
    const choice = select.selectedIndex
    const choice_selected = select.options[choice].value
    return choice_selected

}

