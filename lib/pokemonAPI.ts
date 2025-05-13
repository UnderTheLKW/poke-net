import Axios from 'axios';
import {setupCache} from 'axios-cache-interceptor';
import {PokemonListResponse} from "@/lib/pokemonTypes";

const instance = Axios.create();
const axios = setupCache(instance);

const POKEMON_API = `https://pokeapi.co/api/v2/`;
const pokemonCache = new Map<string, any>();

export async function getPokemon(name: string, retries = 3): Promise<any> {
    const pokemonName = name.toLowerCase();
    if (pokemonCache.has(pokemonName)) {
        return pokemonCache.get(pokemonName);
    }
    try {
        const response = await axios.get(`${POKEMON_API}pokemon/${pokemonName}`);
        const data = response.data;

        pokemonCache.set(pokemonName, data);

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
    const api = 'https://beta.pokeapi.co/graphql/v1beta'
    const resp = await axios.post(api, {
            query: ` 
  {
  pokemon_v2_pokemon {
    id
    name
    height
    weight
    pokemon_v2_pokemonspecy {
      evolves_from_species_id
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemoncries {
      cries
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_encounters {
      pokemon_v2_locationarea {
        pokemon_v2_location {
          name
          pokemon_v2_region {
            name
          }
        }
      }
    }
    pokemon_v2_pokemonstats {
      pokemon_v2_stat {
        name
      }
      base_stat
    }
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
  }
}`.replaceAll("\n", " ")
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    const data: PokemonListResponse = await resp.data;

    data.data.pokemon_v2_pokemon.forEach((pokemon, index) => {
        const evolvesFromPokemonId = pokemon.pokemon_v2_pokemonspecy.evolves_from_species_id

        if (evolvesFromPokemonId != null) {
            data.data.pokemon_v2_pokemon[index].pokemon_v2_encounters = data.data.pokemon_v2_pokemon[evolvesFromPokemonId - 1].pokemon_v2_encounters
        }
    })

    return data.data.pokemon_v2_pokemon
}

export async function getPokemonEvolutions(name: string): Promise<{ name: string; image: string }[]> {
    // Step 1: Get species URL
    const pokemonRes = await axios.get(`${POKEMON_API}pokemon/${name}`);
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
            const res = await axios.get(`${POKEMON_API}pokemon/${pokeName}`);
            return {
                name: pokeName,
                image: res.data.sprites.other['official-artwork'].front_default,
            };
        })
    );
}
