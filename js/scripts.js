const form = document.getElementById('form')
const character = document.getElementById('character')
const infoDiv = document.getElementById('infos')


const createEl = (element, className, text, parent) => {
    const el = document.createElement(element)
    el.className = className
    el.innerHTML = text
    return el
}

const getCharacter = (characterName) => {
    fetch(`https://swapi.co/api/people/?search=${characterName}`)
        .then(data => data.json())
        .then(data => {

            infoDiv.innerHTML = ''
            const resultCount = createEl('h2', 'results-count', `${data.count} results for "${characterName}"`)
            console.log(data);
            console.log(infoDiv);

            infoDiv.appendChild(resultCount)
            data.results.forEach(character => {
                const list = createEl('ul', 'collection with-header', null)
                const name = createEl('li', 'collection-header', ` <h4>  Name: ${character.name} </h4>`)
                const height = createEl('li', 'collection-item', `Heigth: ${character.height}`)
                const hairColor = createEl('li', 'collection-item', `Hair Color: ${character.hair_color}`)
                const skinColor = createEl('li', 'collection-item', `Skin Color: ${character.skin_color}`)
                const birthYear = createEl('li', 'collection-item', `Yearof Birt: ${character.birth_year}`)

                list.appendChild(name)
                list.appendChild(height)
                list.appendChild(hairColor)
                list.appendChild(skinColor)
                list.appendChild(birthYear)
                infoDiv.appendChild(list)
            })


            console.log(data)
        })
        .catch(err => {
            console.log(err);
        })
}


form.addEventListener('submit', e => {
    e.preventDefault()
    getCharacter(character.value)
})