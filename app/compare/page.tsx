import React from 'react'
import {loadPokemonList} from "@/lib/pokemonAPI";
import PokemonCompare from "@/app/components/pokemon-compare";


export default async function Compare() {
    const pokemonList = await loadPokemonList();

    return (
        <PokemonCompare pokemonCompare1={undefined} pokemonCompare2={undefined} pokemonList={pokemonList} />
    )
}
