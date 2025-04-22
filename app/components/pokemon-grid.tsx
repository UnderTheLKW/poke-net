"use client"
import {useEffect, useState} from "react";
import {PokemonCard} from "./pokemon-card";
import {MaterialSymbolsMenu} from "@/app/components/svgs";

interface Pokemon {
    name: string
    image: string
}

interface PokemonGridProps {
    pokemonList: Pokemon[]
}

export function PokemonGrid({pokemonList}: PokemonGridProps) {
    const [searchText, setSearchText] = useState("");
    const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonList);

    useEffect(() => {
        if (searchText === "") {
            setFilteredPokemonList(pokemonList);
        } else {
            setFilteredPokemonList((prev) => prev.filter(
                (pokemon: any) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
            ));
        }
    }, [searchText]);

    return (
        <>
            <div className="h-full flex flex-col safe-padding relative">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 text-center bg-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {filteredPokemonList.map((pokemon: any) => {
                        return (
                            <div key={pokemon.name}
                                 className="h-fit bg-gray-50 rounded-2xl shadow-lg m-2 hover:shadow-xl transition-shadow duration-300">
                                <PokemonCard name={pokemon.name} image={pokemon.image}/>
                            </div>
                        )
                    })}
                </div>
                <div className="bottom-0 flex flex-col items-center w-full fixed">
                    <div className="bg-red-600 w-1/3 max-w-[200px] h-[40px] rounded-t-xl">
                        <MaterialSymbolsMenu  className="w-full"/>
                    </div>
                    <div className="w-full bg-[#072ac8] rounded-t-[16px] px-4 py-2">

                        <div className="w-full bg-[#fdd85d] rounded-[1000px] flex justify-center p-4 mx-auto">
                            <div className=" w-full justify-center bg-white rounded-[1000px] p-4 text-center">
                                <input
                                    type="text"
                                    value={searchText}
                                    autoComplete="off"
                                    id="PokemonName"
                                    placeholder="Charizard, Pikatch, etc..."
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="focus:outline-none"/>
                            </div>
                            {/*<button*/}
                            {/*    className="justify-center w-fit  min-w-[70px] bg-white rounded-[1000px] text-black hover:bg-white/90">*/}
                            {/*    GO*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
