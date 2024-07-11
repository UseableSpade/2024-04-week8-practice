let charactersData = []

const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const characterComponent = (name, height, mass, index, hairColor, eyeColor) => `
    <div class="character">
        <h2>Character ${index + 1}:</h2>
        <p class="name">${name}</p>
        <p class="height">${height} cm</p>
        <p class="weight">${mass} kg</p>
        
        <button class="more">Show more</button>
        <div class="more-data">
            <p class="hairColor">Hair color: ${hairColor}</p>
            <p class="eyeColor">Eye color: ${eyeColor}</p>
        </div>
    </div>
`

const charactersComponent = (charactersData) => `
    <div class="characters">
        ${charactersData
            .map((characterData, index) => characterComponent(
                characterData.name, 
                characterData.height, 
                characterData.mass, 
                index,
                characterData.hair_color,
                characterData.eye_color
            ))
            .join(" ")
        }
    </div>
`

const makeDomFromData = (data, rootElement) => {
    charactersData.push(...data.results)
    let charactersHtml = charactersComponent(charactersData)
    const buttonHtml = `<button class="fetch">Load more...</button>`
    const filterHtml = `<input type="text" class="filter-input" placeholder="Filter characters...">`
    
    /* ADDING SHOW MORE BUTTON
        - adds to all HTML elements with class more
        - loop through with forEach to add eventListener
        - on click adds/removes "clicked" attribute to class using toggle method
        - changes innerText to show more / show less */

    rootElement.insertAdjacentHTML("beforeend", charactersHtml)
    const moreButtonElements = document.querySelectorAll("button.more")
    moreButtonElements.forEach(moreButtonElement => moreButtonElement.addEventListener("click", () => {
        moreButtonElement.classList.toggle("clicked")
        moreButtonElement.innerText === "show more" ? moreButtonElement.innerHTML = "show less" : moreButtonElement.innerText = "show more"
    }))

    /* ADDING FILTER TO TOP OF THE PAGE
        - select filter-input element and adds keyup event listener
        - defines filter value in lowercase
        - defines character items by selecting all content
        - loops through all content with forEach and compares it with filter value string to display matches
     */

    rootElement.insertAdjacentHTML("afterbegin", filterHtml)
        const filterElement = document.querySelector(".filter-input")
        filterElement.addEventListener("keyup", function() {
            const filterValue = this.value.toLowerCase()
            const characterItems = document.querySelectorAll(".character")

            characterItems.forEach(function(item) {
                const text = item.textContent.toLowerCase()
                if (text.includes(filterValue)) {
                    item.style.display = ""
                } else {
                    item.style.display = "none"
                }
            })
        })

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