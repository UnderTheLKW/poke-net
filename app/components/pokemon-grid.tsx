"use client"
import {useEffect, useState} from "react";
import {PokemonCard} from "./pokemon-card";

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
            <div className="h-full flex flex-col">
                <div
                    className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 overflow-y-auto text-center bg-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {filteredPokemonList.map((pokemon: any) => {
                        return (
                            <div key={pokemon.name}
                                 className="bg-gray-50 rounded-2xl shadow-lg m-2 hover:shadow-xl transition-shadow duration-300">
                                <PokemonCard name={pokemon.name} image={pokemon.image}/>
                            </div>
                        )
                    })}
                </div>

                {/*<div*/}
                {/*    className="grid item-centerbg-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">*/}
                {/*    <label htmlFor="PokemonName">Search</label>*/}
                {/*    */}
                {/*</div>*/}
                {/* Bottom search bar */}
                {/*<div className="absolute w-full h-[180px] bottom-0 left-0">*/}
                <div className="w-full bg-[#072ac8] rounded-t-[16px] px-4 py-2">
                    <div className="w-full bg-[#fdd85d] rounded-[1000px] flex p-4 mx-auto">
                        <div className="bg-white rounded-[1000px] flex p-4">
                        <input
                            type="text"
                            value={searchText}
                            autoComplete="off"
                            id="PokemonName"
                            placeholder="Charizard, Pikatch, etc..."
                            onChange={(e) => setSearchText(e.target.value)}/>
                        </div>
                        {/*<Button*/}
                        {/*    className="w-[90px] h-[45px] bg-white rounded-[1000px] text-black [font-family:'Happy_Monkey',Helvetica] hover:bg-white/90">*/}
                        {/*    GO*/}
                        {/*</Button>*/}
                    </div>
                </div>

                {/* Menu button */}
                </div>
                {/*</div>*/}
        </>
    )
}
