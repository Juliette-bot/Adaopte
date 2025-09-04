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
    /* const card = document.querySelector('.card')
     const  cardPhoto = document.querySelector('.cardPhoto')
     const cardText = document.querySelector('.cardText')
    */

    const card = document.createElement("div");
    card.classList.add("card")
    flex.appendChild(card)



    const cardPhoto = document.createElement("div");
    cardPhoto.classList.add("cardPhoto")
    cardPhoto.style.backgroundImage = `url(${animal.imageUrl})`;
    cardPhoto.style.backgroundPosition = `center`
    cardPhoto.style.backgroundSize = `cover`
    cardPhoto.alt = animal.name;
    card.appendChild(cardPhoto)


   
    const cardText = document.createElement("div");
    cardText.classList.add("cardText")
    card.appendChild(cardText)

    const divMeet = document.createElement('div')
    divMeet.classList.add('divMeet')
    card.appendChild(divMeet)

    const type = document.createElement("p")
    type.innerText = animal.type
    type.classList.add("textCard");

    const h2 = document.createElement("h2")
    h2.innerText = animal.name
    h2.classList.add("name");

    const age = document.createElement("p")
    age.innerText = animal.age
    age.classList.add("textCard");

    const city = document.createElement("p")
    city.innerText = animal.city
    city.classList.add("textCard");

    const description = document.createElement("p")
    description.innerText = animal.description
    description.classList.add("descriptionCard");

    const meet = document.createElement("a")
    meet.innerText = "Rencontrer"
    meet.classList.add("btnMeet");


    cardText.appendChild(type);
    cardText.appendChild(h2);
    cardText.appendChild(age);
    cardText.appendChild(city);
    cardText.appendChild(description);

    divMeet.appendChild(meet);



  });
}
displayPhotosAdopt();
