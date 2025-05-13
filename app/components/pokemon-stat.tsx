'use client';

import React, {useState} from 'react'
import PokemonOverallChart from "@/app/components/pokemon-overall-chart";
import {Pokemon} from "@/lib/pokemonTypes";
import {MdiExpandMore} from "@/app/components/svgs";

type PokemonStatProps = {
    statName: string,
    pokemonList: Pokemon[],
    pokemonName: string
}

export default function PokemonStat({statName, pokemonList, pokemonName}: PokemonStatProps) {
    let pokemonStatValue = pokemonList.find(pokemon => pokemon.name.toLowerCase() == pokemonName.toLowerCase())?.pokemon_v2_pokemonstats.find(stat => stat.pokemon_v2_stat.name == statName)?.base_stat
    let [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-1 border-b pb-1 text-sm">
            <div className="w-full flex justify-between" onClick={() => setOpen(!open)}>
                <span className="capitalize text-gray-600">{statName}</span>
                <div className="flex gap-0.5">
                    <span className="font-bold text-gray-900">{pokemonStatValue}</span>
                    <MdiExpandMore style={{
                        transform: open ? "rotate(180deg)" : "unset"
                    }} className="transition-all ease-in-out duration-250"/>
                </div>
            </div>
            { open &&
                <PokemonOverallChart pokemonList={pokemonList} pokemonName={pokemonName} statName={statName} />
            }
        </div>
    )
}
