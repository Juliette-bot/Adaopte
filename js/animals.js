async function displayPhotosHome() {
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
    card.id = `photos${index + 1}`;

    const img = document.createElement("img");
    img.src = animal.imageUrl;
    img.alt = animal.name;
    img.classList.add("photos");
    card.appendChild(img);
     const columnIndex =  Math.floor(index / 2);
     columns[columnIndex].appendChild(card);
  });
}
displayPhotosHome();
