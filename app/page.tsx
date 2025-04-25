import {PokemonGrid} from "./components/pokemon-grid";
import {loadPokemonList} from "@/lib/pokemonAPI";

export default async function Page({searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;

    const regionParam = params.region
    const region: string = (Array.isArray(regionParam) ? regionParam[0] : regionParam) ?? "";

    const typeParam = params.type;
    const pokemonType: string = (Array.isArray(typeParam) ? typeParam[0] : typeParam) ?? "";

    const pokemonList = await loadPokemonList();

    return (
        <div className="items-center h-full">
            <PokemonGrid pokemonList={pokemonList} regionFilter={region} typeFilter={pokemonType}/>
        </div>
    );
}
