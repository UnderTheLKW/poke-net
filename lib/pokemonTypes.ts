export type PokemonListResponse = {
    data: {
        pokemon_v2_pokemon: Pokemon[]
    }
}

export type Pokemon = {
    id: number
    name: string
    height: number
    weight: number
    pokemon_v2_pokemonspecy: PokemonSpecy
    pokemon_v2_pokemonsprites: PokemonSprite[]
    pokemon_v2_encounters: PokemonEncounter[]
    pokemon_v2_pokemoncries: PokemonCry[]
    pokemon_v2_pokemontypes: PokemonType[]
    pokemon_v2_pokemonstats: PokemonStat[]
    pokemon_v2_pokemonabilities: PokemonAbility[]
}

type PokemonAbility = {
    pokemon_v2_ability: {
        name: string
    }
}

type PokemonStat = {
    base_stat: number,
    pokemon_v2_stat: {
        name: string
    }
}

type PokemonSpecy = {
    evolves_from_species_id: number | null
}

type PokemonEncounter = {
    pokemon_v2_locationarea: PokemonLocationArea
}

type PokemonLocationArea = {
    pokemon_v2_location: PokemonLocation
}

type PokemonLocation = {
    id: number
    name: string
    pokemon_v2_region: PokemonRegion
}

type PokemonRegion = {
    id: number
    name: string
}

type PokemonSprite = {
    sprites: {
        other: {
            'official-artwork': {
                front_default: string | null
            }

        }
        front_default: string | null
    }
}

type PokemonCry = {
    cries: {
legacy: string
    }
}

type PokemonType = {
    pokemon_v2_type: {
        name: string
    }
}
