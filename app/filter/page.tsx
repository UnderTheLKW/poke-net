import React from 'react'
import SearchBar from "@/app/components/search-bar";
import Link from "next/link";
import {loadPokemonList} from "@/lib/pokemonAPI";

export default async function FilterPage() {
    const pokemonList = await loadPokemonList();

    const allRegions = pokemonList
        .flatMap(pokemonRegions => pokemonRegions.pokemon_v2_encounters.map(encounter => encounter.pokemon_v2_locationarea.pokemon_v2_location.pokemon_v2_region.name))
        .filter(Boolean);
    const uniqueRegions = Array.from(new Set(allRegions));

    const allTypes = pokemonList
        .flatMap(pokemon => pokemon.pokemon_v2_pokemontypes.map(pokemonType => pokemonType.pokemon_v2_type.name))
        .filter(Boolean);
    const uniqueTypes = Array.from(new Set(allTypes)).sort();


    return (
        <>
            <div className="bg-gray-300 min-h-screen flex justify-center">
                <div className="flex flex-col w-full max-w-[800px] p-4 pb-32 gap-4">
                    <Link href="/compare/">
                        <button className="w-full text-white bg-[#6e45ff] rounded-[1000px] px-4 py-4">
                            Compare Pokemon's
                        </button>
                    </Link>
                    <div className="bg-white rounded-xl p-4">
                        <div className="flex justify-center mb-4">
                            <span className="bg-gray-200 px-4 py-1 rounded-full text-sm">Region</span>
                        </div>
                        <div className=" justify-center gap-2 flex flex-wrap">
                            {uniqueRegions.map(region => (
                                <Link key={region} href={`/?region=${region}`}>
                                    <button
                                        className=" px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-blue-600 transition whitespace-nowrap capitalize">
                                        {region}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                        <div className="flex justify-center mb-4">
                            <span className="bg-gray-200 px-4 py-1 rounded-full text-sm">Type</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {uniqueTypes.map(type => (
                                <Link key={type} href={`/?type=${type}`}>
                                    <button className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-green-500 transition capitalize">
                                        {type}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <SearchBar showFilterButton={false}>
                    <Link href="/">
                        <button>
                            Back
                        </button>
                    </Link>
                </SearchBar>
            </div>
        </>
    );
}
