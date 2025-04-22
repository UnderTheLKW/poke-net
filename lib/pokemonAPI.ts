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

export async function getPokemonEvolutions(name: string): Promise<{ name: string; image: string }[]> {
    // Step 1: Get species URL
    const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const speciesUrl = pokemonRes.data.species.url;

    // Step 2: Get evolution chain URL
    const speciesRes = await axios.get(speciesUrl);
    const evoChainUrl = speciesRes.data.evolution_chain.url;

    // Step 3: Get evolution chain data
    const evoRes = await axios.get(evoChainUrl);
    const chain = evoRes.data.chain;

    // Step 4: Walk through evolution chain
    const evolutions: string[] = [];
    function walkChain(node: any) {
        evolutions.push(node.species.name);
        if (node.evolves_to.length > 0) {
            walkChain(node.evolves_to[0]);
        }
    }
    walkChain(chain);

    return await Promise.all(
        evolutions.map(async (pokeName) => {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
            return {
                name: pokeName,
                image: res.data.sprites.other['official-artwork'].front_default,
            };
        })
    );
}
