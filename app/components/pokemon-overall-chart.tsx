'use client';

import React from 'react'
import {Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis} from "recharts";
import {Pokemon} from "@/lib/pokemonTypes";


type PokemonOverAllChartProps = {
    pokemonList: Pokemon[],
    pokemonName: string,
    statName: string
}

export default function PokemonOverAllChart({pokemonList, pokemonName, statName}: PokemonOverAllChartProps) {

    let pokemonStatValue = pokemonList.find(pokemon => pokemon.name.toLowerCase() == pokemonName.toLowerCase())?.pokemon_v2_pokemonstats.find(stat => stat.pokemon_v2_stat.name == statName)?.base_stat

    let frequencies: {
        statValue: number,
        count: number
    }[] = [];

    pokemonList.forEach(pokemon => {
        const statValue = pokemon.pokemon_v2_pokemonstats.find(stat => stat.pokemon_v2_stat.name == statName)?.base_stat

        if (!statValue) return;

        if (frequencies[statValue]) {
            frequencies[statValue].count += 1;
        } else {
            frequencies[statValue] = {
                statValue,
                count: 1
            }
        }
    });

    for (let i = 0; i < frequencies.length; i++) {
        if (!frequencies[i]) {
            frequencies[i] = {
                statValue: i,
                count: 0
            }
        }
    }

    return (
        <ResponsiveContainer width="100%" height={200}>

            <LineChart
                width={500}
                height={300}
                data={frequencies}
            >
                <XAxis dataKey="statValue" domain={[0, 'dataMax']}/>

                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    activeDot={false}
                    dot={false}
                />

                <ReferenceLine x={pokemonStatValue} stroke="green"/>

            </LineChart>
        </ResponsiveContainer>
    );
}
