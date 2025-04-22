'use client'
import {ReactNode} from "react";

type PokemoCryProps = {
    id: number,
    children: ReactNode
}

const PokemonCry = ({id, children} : PokemoCryProps)=> {
    const playCry = () => {
        const cry = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${id}.ogg`);
        cry.play();
    };
    return <>
    <button className="min-w-[90px] px-4 py-2 text-sm font-semibold text-black bg-white rounded-[1000px] hover:bg-white/90 transition-all duration-200 shadow-sm" onClick={playCry}>
        {children}
    </button>
    </>
}

export default PokemonCry
