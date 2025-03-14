"use client"
import {useState} from "react";
import { PokemonCard } from "./pokemon-card";

interface PokemonGridProps {
    pokemonList: any
}

export function PokemonGrid({ pokemonList } : PokemonGridProps){
    const [ searchText, setSearchText ] = useState("");

    console.log(pokemonList);

    return(
        <>
        <div>
            <h3 className="text-2xl py-6 text-center">Search for your Pokemon</h3>
            <div className="grid w-full max-w-sm item-center gab-1.5">
            <label htmlFor="PokemonName">Pokemon name: </label>
            <input
            type="text"
            value={searchText}
            autoComplete="off"
            id="PokemonName"
            placeholder="Charizard, Pikatch, etc..."
            onChange={(e) => setSearchText(e.target.value)}/>
            </div>
            
        <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
        </div>
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text_left">
            {pokemonList.map((pokemon : any ) => {
                return (
                    <PokemonCard name={pokemon.name} />
                )
            })}
        </div>
        </>
    )
}