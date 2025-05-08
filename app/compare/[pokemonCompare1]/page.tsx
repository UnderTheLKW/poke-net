import React from 'react'
import {loadPokemonList} from "@/lib/pokemonAPI";
import PokemonCompare from "@/app/components/pokemon-compare";

export default async function Compare({params}: { params: Promise<{ pokemonCompare1: string }> }) {
    const {pokemonCompare1} = await params;

    const pokemonList = await loadPokemonList();
    const pokemon1 = pokemonList.find(pokemon => pokemon.name.toLowerCase() == pokemonCompare1.toLowerCase())

    return (
        <PokemonCompare pokemonCompare1={pokemon1} pokemonCompare2={undefined} pokemonList={pokemonList} />
    )
}
