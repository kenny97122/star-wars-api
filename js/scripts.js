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

    let loader = `
          <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    `;
    infoDiv.innerHTML = loader
    fetch(`https://swapi.co/api/people/?search=${characterName}`)
        .then(data => data.json())
        .then(data => {

            infoDiv.innerHTML = ''
            const resultCount = createEl('h2', 'results-count', `${data.results.length} results for "${characterName}"`)
            console.log(data);
            infoDiv.appendChild(resultCount)
            data.results.forEach(character => {
                const list = createEl('ul', 'collection with-header', null)
                const name = createEl('li', 'collection-header', ` <h4>  Name: ${character.name} </h4>`)
                const height = createEl('li', 'collection-item', `<b>Heigth:</b> ${character.height}`)
                const hairColor = createEl('li', 'collection-item', `<b>Hair Color:</b> ${character.hair_color}`)
                const skinColor = createEl('li', 'collection-item', `<b>Skin Color:</b> ${character.skin_color}`)
                const birthYear = createEl('li', 'collection-item', `<b>Year of Birth:</b> ${character.birth_year}`)



                fetch(character.homeworld)
                    .then(data => data.json())
                    .then(data => {
                        console.log(`Second Data:`, data);
                        const homeData = createEl('li', 'collection-item ', `<b>Home Name:</b>  ${data.name} <hr>`)
                        const diameter = createEl('p', '', `<b>Diameter:</b> ${data.diameter}`)
                        const climate = createEl('p', '', `<b>Climate: </b>${data.climate}`)
                        const population = createEl('p', '', `<b>Population:</b> ${data.population}`)
                        list.appendChild(homeData)
                        homeData.appendChild(diameter)
                        homeData.appendChild(climate)
                        homeData.appendChild(population)
                        const filmData = createEl('li', 'collection-item', `<b> Played in:</b> <hr>`)
                        data.films.forEach(film => {
                            fetch(film)
                                .then(data => data.json())
                                .then(data => {
                                    console.log(data);

                                    const filmTitle = createEl('p', '', `- ${data.title}`)
                                    filmData.appendChild(filmTitle)
                                    list.appendChild(filmData)

                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })

                    })
                    .catch(err => {
                        console.log(err);

                    })



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