async function displayPhotosHome() {
  const response = await fetch("/assets/animals.json");
  const animals = await response.json();
  const imageDivs = document.querySelectorAll("#gridPhotos .img");
  
  
  
  

  animals.forEach((animal, index) => {
    const div = imageDivs[index];
    div.style.backgroundImage = `url(${animal.imageUrl})`;
     div.style.backgroundSize = "cover";
    div.style.backgroundPosition = "center";
    div.style.backgroundRepeat = "no-repeat";
  });
}
displayPhotosHome();
