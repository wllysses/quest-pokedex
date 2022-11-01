export async function pokemon(limit, offSet) {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offSet}`
    const response = await fetch(url)
    const json = await response.json()
    const names = await json.results.map(pokemon => {return pokemon.name})
    return await names
}

export async function getPokemons(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    return await response.json()
}

export async function getAbilities(ability) {
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${ability}/`)
    return await response.json()
}