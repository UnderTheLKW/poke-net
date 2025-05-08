'use client'
import React, {useEffect, useState} from 'react'
import {Pokemon} from "@/lib/pokemonTypes";
import {useRouter} from "next/navigation";
import {getPokemon} from "@/lib/pokemonAPI";
import {typeColors} from "@/lib/typeColors";
import SearchBar from "@/app/components/search-bar";
import Link from "next/link";

interface PokemonCompareProps {
    pokemonList: Pokemon[],
    pokemonCompare1: Pokemon | undefined,
    pokemonCompare2: Pokemon | undefined
}


export default function PokemonCompare({pokemonList, pokemonCompare1, pokemonCompare2}: PokemonCompareProps) {
    const router = useRouter()
    const [pokemon1, setPokemon1] = useState(pokemonCompare1?.name ?? "")
    const [pokemon2, setPokemon2] = useState(pokemonCompare2?.name ?? "")

    const [pokemon1Stats, setPokemon1Stats] = useState<any>(undefined);
    const [pokemon2Stats, setPokemon2Stats] = useState<any>(undefined);

    useEffect(() => {
        const pokemon1Exists = pokemonList.some(pokemon => pokemon.name == pokemon1)
        const pokemon2Exists = pokemonList.some(pokemon => pokemon.name == pokemon2)
        if (pokemon1Exists && pokemon2Exists) {
            router.push(`/compare/${pokemon1?.toLowerCase()}/${pokemon2?.toLowerCase()}`)
        }
    }, [pokemon1, pokemon2]);

    useEffect(() => {
        const pokemon1Exists = pokemonList.some(pokemon => pokemon.name == pokemon1)
        const pokemon2Exists = pokemonList.some(pokemon => pokemon.name == pokemon2)

        pokemon1Exists && getPokemon(pokemon1).then((data) => setPokemon1Stats(data));
        pokemon2Exists && getPokemon(pokemon2).then((data) => setPokemon2Stats(data));
    }, [pokemon1, pokemon2]);

    return (
        <div className="pb-28 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 max-w-xl md:max-w-5xl">
                <div className="flex flex-col items-center w-full">
                    <input
                        list="pokemonList"
                        value={pokemon1}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPokemon1(e.target.value)}
                        placeholder="Choose Pokémon 1"
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {
                        pokemon1Stats && <>
                            <div className="bg-white shadow-lg rounded-2xl p-6 text-center mb-6 w-full">
                                <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon1Stats.name}</h1>
                                <img
                                    src={pokemon1Stats.sprites.other['official-artwork'].front_default}
                                    alt={pokemon1Stats.name}
                                    className="w-48 h-48 object-contain mx-auto"
                                />
                            </div>
                            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center w-full">
                                {pokemon1Stats.types && (
                                    <div className="mt-4">
                                        <h2 className="text-lg font-semibold mb-2">
                                            Type{pokemon1Stats.types.length > 1 ? 's' : ''}
                                        </h2>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {pokemon1Stats.types.map((typeObj: any, index: number) => (
                                                <span
                                                    key={`${typeObj.type.name}-${index}`}
                                                    className={`px-3 py-1 rounded-full text-sm text-white capitalize ${
                                                        typeColors[typeObj.type.name] || 'bg-gray-400'
                                                    }`}
                                                >
                                                    {typeObj.type.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center w-full">
                                <h2 className="text-xl font-semibold mb-4">Stats</h2>
                                <div className="space-y-2">
                                    {pokemon1Stats.stats.map((stat: any) => (
                                        <div key={stat.stat.name}
                                             className="flex justify-between border-b pb-1 text-sm">
                                            <span className="capitalize text-gray-600">{stat.stat.name}</span>
                                            <span className="font-bold text-gray-900">{stat.base_stat}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <h2 className="text-lg font-semibold mb-2">Abilities</h2>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {pokemon1Stats.abilities.map((ability: any, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
                                            >
                                                {ability.ability.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <h2 className="text-lg font-semibold mb-2">Measurements</h2>
                                    <p className="text-sm text-gray-600">
                                        Height: <span className="font-bold">{pokemon1Stats.height / 10} m</span> |
                                        Weight:{' '}
                                        <span className="font-bold">{pokemon1Stats.weight / 10} kg</span>
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="flex flex-col items-center w-full">
                    <input
                        list="pokemonList"
                        value={pokemon2}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPokemon2(e.target.value)}
                        placeholder="Choose Pokémon 2"
                        className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {pokemon2Stats && <>
                        <div className="bg-white shadow-lg rounded-2xl p-6 text-center mb-6 w-full">
                            <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon2Stats.name}</h1>
                            <img
                                src={pokemon2Stats.sprites.other['official-artwork'].front_default}
                                alt={pokemon2Stats.name}
                                className="w-48 h-48 object-contain mx-auto"
                            />
                        </div>
                        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center w-full">
                            {pokemon2Stats.types && (
                                <div className="mt-4">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Type{pokemon2Stats.types.length > 1 ? 's' : ''}
                                    </h2>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {pokemon2Stats.types.map((typeObj: any, index: number) => (
                                            <span
                                                key={`${typeObj.type.name}-${index}`}
                                                className={`px-3 py-1 rounded-full text-sm text-white capitalize ${
                                                    typeColors[typeObj.type.name] || 'bg-gray-400'
                                                }`}
                                            >
                                                {typeObj.type.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center w-full">
                            <h2 className="text-xl font-semibold mb-4">Stats</h2>
                            <div className="space-y-2">
                                {pokemon2Stats.stats.map((stat: any) => (
                                    <div key={stat.stat.name} className="flex justify-between border-b pb-1 text-sm">
                                        <span className="capitalize text-gray-600">{stat.stat.name}</span>
                                        <span className="font-bold text-gray-900">{stat.base_stat}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <h2 className="text-lg font-semibold mb-2">Abilities</h2>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {pokemon2Stats.abilities.map((ability: any, index: number) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
                                        >
                                            {ability.ability.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <h2 className="text-lg font-semibold mb-2">Measurements</h2>
                                <p className="text-sm text-gray-600">
                                    Height: <span className="font-bold">{pokemon2Stats.height / 10} m</span> |
                                    Weight:{' '}
                                    <span className="font-bold">{pokemon2Stats.weight / 10} kg</span>
                                </p>
                            </div>
                        </div>

                    </>
                    }
                </div>
            </div>
            <datalist id="pokemonList">
                {pokemonList.map((pokemon) => (
                    <option key={pokemon.name} value={pokemon.name}>
                        {pokemon.name}
                    </option>
                ))}
            </datalist>
            <SearchBar showFilterButton={false}>
                <Link href="/">
                    <button>
                        Back
                    </button>
                </Link>
            </SearchBar>
        </div>
    )
}
