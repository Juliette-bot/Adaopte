const burgerBtn = document.getElementById('burgerBtn')
const navLinks = document.getElementById('navLinks')

burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})


async function displayPhotosAdopt() {
  const response = await fetch("/assets/animals.json");
  const animals = await response.json();
  const columns = [
    document.getElementById('column1'),
    document.getElementById('column2'),
    document.getElementById('column3'),
    document.getElementById('column4')
  ]
  
  

  animals.forEach((animal, index) => {
    const card = document.createElement("div");
    card.classList.add("card")

    const img = document.createElement("img");
    img.src = animal.imageUrl;
    img.alt = animal.name;
    img.classList.add("photo");

    const type = document.createElement("p")
    type.innerText = animal.type
    type.classList.add("textCard");

    const h2 = document.createElement("h2")
    h2.innerText = animal.name
    h2.classList.add("name");
    
    const age = document.createElement("p")
    age.innerText = animal.age
    age.classList.add("textCard");

    const zipcode = document.createElement("p")
    zipcode.innerText = animal.zipcode
    zipcode.classList.add("textCard");

    const description = document.createElement("p")
    description.innerText = animal.description
    description.classList.add("textCard");

    const meet = document.createElement("a")
    meet.innerText = "Rencontrer"
    meet.classList.add("btnMeet");

     /*const columnIndex =  Math.floor(index / 2);
     columns[columnIndex].appendChild(card);
    */
    const flex = document.getElementById('grid-card-adoption')
    flex.appendChild(card)
    card.appendChild(img);
    card.appendChild(type);
    card.appendChild(h2);
    card.appendChild(age);
    card.appendChild(zipcode);
    card.appendChild(description);
    card.appendChild(meet);

  });
}
displayPhotosAdopt();
