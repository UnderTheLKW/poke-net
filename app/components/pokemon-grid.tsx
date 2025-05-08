"use client"
import React, {useEffect, useState} from "react";
import {PokemonCard} from "./pokemon-card";
import SearchBar from "@/app/components/search-bar";
import {Pokemon} from "@/lib/pokemonTypes";
import {useWindowVirtualizer} from "@tanstack/react-virtual";

interface PokemonGridProps {
    pokemonList: Pokemon[],
    regionFilter: string
    typeFilter: string
}

function useColumnCount() {
    const [columns, setColumns] = useState(getColumnCount());

    useEffect(() => {
        const handleResize = () => {
            const newCount = getColumnCount();
            setColumns((prev) => {
                if (prev !== newCount) return newCount;
                return prev;
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function getColumnCount() {
        if (typeof window === 'undefined') {
            return 3;
        }

        const width = window.innerWidth;

        if (width < 640) {
            return 1;
        } else if (width < 1024) {
            return 2;
        }

        return 3;
    }

    return columns;
}

export function PokemonGrid({pokemonList, regionFilter = "", typeFilter = ""}: PokemonGridProps) {
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

    const listRef = React.useRef<HTMLDivElement | null>(null)
    const columnCount = useColumnCount();

    const rows: Pokemon[][] = [];
    for (let i = 0; i < filteredPokemonList.length; i += columnCount) {
        rows.push(filteredPokemonList.slice(i, i + columnCount));
    }

    const virtualizer = useWindowVirtualizer({
        count: rows.length,
        estimateSize: () => 160,
        overscan: 5,
        gap: 15,
        scrollMargin: listRef.current?.offsetTop ?? 0,
    })

    useEffect(() => {
        virtualizer.measure();
    }, [columnCount]);

    return (
        <div className="pb-28">
            <div className="h-full flex flex-col safe-padding relative m-2" ref={listRef}>
                <div style={{height: `${virtualizer.getTotalSize()}px`}}
                     className="relative w-full text-center">
                    {virtualizer.getVirtualItems().map((row) => {
                        const pokemons = rows[row.index];

                        return (
                            <div key={row.key}
                                 ref={virtualizer.measureElement}
                                 className="absolute top-0 left-0 w-full grid gap-4 px-4"
                                 style={{
                                     transform: `translateY(${row.start}px)`,
                                     gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                                 }}>
                                {
                                    pokemons.map((pokemon, index) => {
                                        return (
                                            <div
                                                key={`${row.key}-${index}`}
                                                className="rounded-2xl bg-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                                <PokemonCard name={pokemon.name}
                                                             image={pokemon.pokemon_v2_pokemonsprites[0].sprites.other["official-artwork"].front_default ?? "/placeholder.png"}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <SearchBar>
                <input
                    type="text"
                    value={searchText}
                    autoComplete="off"
                    id="PokemonName"
                    placeholder="Search: Charizard, Pikatchu, etc..."
                    onChange={(e) => setSearchText(e.target.value)}
                    className="focus:outline-none w-full"/>
            </SearchBar>
        </div>
    )
}
