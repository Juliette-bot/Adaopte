async function animalsResearch(){
    const response = await fetch ('/assets/animals.json')
    const listAnimals = await response.json()
    console.log(listAnimals)
}

animalsResearch() 