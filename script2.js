async function fetchData() {
    const fetchResult = await fetch("https://swapi.dev/api/people/")
    const data = await fetchResult.json()
    const characters = data.results //characters = array [10]
    //console.log(characters)
    
const rootElement = document.querySelector("#root")
let charactersHtml = ""

/* for (let i = 0; i < characters.length; i++) {
    console.log(characters[i])

    charactersHtml += `
        <div class="character">
            <p class="name">${characters[i].name} </p>
            <p class="height">${characters[i].height} </p>
            <p class="weight">${characters[i].mass} </p>
        </div>
    `
} */

characters.forEach(character => charactersHtml += `
        <div class="character>
            <p class="name"> ${character.name}</p>
            <p class="height"> ${character.height} cm</p>
            <p class="weight"> ${character.weight} kg</p>
        </div>
    `
)

rootElement.insertAdjacentHTML("beforeend", charactersHtml)

}

fetchData()