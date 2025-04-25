"use client"
import {useEffect, useState} from "react";
import {PokemonCard} from "./pokemon-card";
import SearchBar from "@/app/components/search-bar";
import {Pokemon} from "@/lib/pokemonTypes";

interface PokemonGridProps {
    pokemonList: Pokemon[],
    regionFilter: string
    typeFilter: string
}

export function PokemonGrid({pokemonList, regionFilter="", typeFilter=""}: PokemonGridProps) {
    const [searchText, setSearchText] = useState("");
    const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
    const updateFilteredPokemonList = () => {
        const pokemonsInRegion = pokemonList.filter(pokemon => regionFilter == "" || pokemon.pokemon_v2_encounters.some(encounter => {
            const regionName = encounter.pokemon_v2_locationarea.pokemon_v2_location.pokemon_v2_region.name;
            return regionName.toLowerCase() == regionFilter.toLowerCase()
        }))

        const pokemonsWithType = pokemonsInRegion.filter(pokemon => typeFilter == "" || pokemon.pokemon_v2_pokemontypes.some(pokemonType => {
            const typeName = pokemonType.pokemon_v2_type.name
            return typeName.toLowerCase() == typeFilter.toLowerCase()
        }))

        if (searchText === "") {
            setFilteredPokemonList(pokemonsWithType);
        } else {
            setFilteredPokemonList((prev) => prev.filter(
                (pokemon) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
            ));
        }
    }
    useEffect(() => {
        updateFilteredPokemonList()
    }, [searchText]);

    return (
        <>
            <div className="h-full flex flex-col safe-padding relative">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 text-center bg-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {filteredPokemonList.map((pokemon) => {
                        return (
                            <div key={pokemon.name}
                                 className="h-fit bg-gray-50 rounded-2xl shadow-lg m-2 hover:shadow-xl transition-shadow duration-300">
                                <PokemonCard name={pokemon.name} image={pokemon.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default ?? ""}/>
                            </div>
                        )
                    })}
                </div>
                <SearchBar>
                    <input
                        type="text"
                        value={searchText}
                        autoComplete="off"
                        id="PokemonName"
                        placeholder="Search: Charizard, Pikatch, etc..."
                        onChange={(e) => setSearchText(e.target.value)}
                        className="focus:outline-none"/>
                </SearchBar>
            </div>
        </>
    )
}
