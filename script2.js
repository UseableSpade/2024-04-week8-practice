let charactersData = []

const characterComponent = (name, height, mass, index) => `
    <div class="character">
        <h2>Character ${index + 1}:</h2>
        <p class="name">${name}</p>
        <p class="height">${height} cm</p>
        <p class="weight">${mass} kg</p>
    </div>
`

const charactersComponent = (charactersData) => `
    <div class="characters">
        ${charactersData
            .map(characterData, index => characterComponent(characterData.name, characterData.height, characterData.mass))
            .join(" ")
        }
    </div>
`

const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const makeDomFromData = (data, rootElement) => {
    charactersData.push(...data.results)
    let charactersHtml = charactersComponent(charactersData)
    const buttonHtml = `<button class="fetch">load more...</button>`

    rootElement.insertAdjacentHTML("beforeend", charactersHtml)
        if (data.next) {
            rootElement.insertAdjacentHTML("beforeend", buttonHtml)

        const buttonElement = document.querySelector("button.fetch")
        buttonElement.addEventListener("click", async () => {
            buttonElement.innerText = "Loading next page..."
            buttonElement.disabled = true
            
            const newData = await fetchData(data.next)
            rootElement.innerHTML = ""
            makeDomFromData(newData, rootElement)
        })
    }
} 

const init = async () => {
    const data = await fetchData("https://swapi.dev/api/people/")
    const rootElement = document.querySelector("#root")
    makeDomFromData(data, rootElement)
}

init()

/* async function fetchData() {
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
 */