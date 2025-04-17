import axios from "axios";

const POKEMON_API = `https://pokeapi.co/api/v2/`;
const pokemonCache = new Map<string, any>();

export async function getPokemon(name: string, retries = 3): Promise<any> {
    const key = name.toLowerCase();
    if (pokemonCache.has(key)) {
        return pokemonCache.get(key);
    }
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${key}`);
        const data = response.data;

        pokemonCache.set(key, data);

        return data;
    } catch (error: any) {
        console.error(`Error fetching Pokémon: ${error.message || error}`);

        if (retries > 0) {
            return await getPokemon(name, retries - 1);
        } else {
            throw new Error(`Failed to fetch Pokémon "${name}"`);
        }
    }
}

export async function loadPokemonList() {
    const firstBatch = await fetchPokemonBatch(0, 75);
    const secondBatch = await fetchPokemonBatch(75,76);

    return [...firstBatch, ...secondBatch];
}

async function fetchPokemonBatch(offset: number, limit: number) {
    const res = await axios.get(`${POKEMON_API}pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.data;
    const baseList = data.results;

    return await Promise.all(
        baseList.map(async (pokemon: { name: string }) => {
            const fullData = await getPokemon(pokemon.name);
            return {
                name: pokemon.name,
                image: fullData.sprites.other['official-artwork'].front_default,
            };
        })
    );
}
