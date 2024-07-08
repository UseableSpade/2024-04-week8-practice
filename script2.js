const characterComponent = (name, height, mass) => `
    <div class="character">
        <h2>Character:</h2>
        <p class="name">${name}</p>
        <p class="height">${height} cm</p>
        <p class="weight">${mass} kg</p>
    </div>
`

const charactersComponent = (charactersData) => `
    <div class="characters">
        ${charactersData
            .map(characterData => characterComponent(characterData.name, characterData.height, characterData.mass))
            .join(" ")
        }
    </div>
`

async function fetchData() {
    const fetchResult = await fetch("https://swapi.dev/api/people/")
    const data = await fetchResult.json()
    const characters = data.results
    
    const rootElement = document.querySelector("#root")
    rootElement.insertAdjacentHTML("beforeend", charactersComponent(characters))
    rootElement.insertAdjacentHTML("beforeend", `<button class="fetch">load more...</button>`)
    
    const fetchButtonElement = document.querySelector("button.fetch")
    fetchButtonElement.addEventListener("click", async () => {
        console.log("fetch next page")
        console.log(data.next)
        
        const newFetchResult = await fetch(data.next)
        console.log(newFetchResult)
        const newData = await newFetchResult.json()
        console.log(newData)
        const newCharacters = newData.results
        
        rootElement.insertAdjacentHTML("beforeend", charactersComponent(newCharacters))
    })
}

fetchData()