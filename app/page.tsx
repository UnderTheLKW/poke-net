import { PokemonGrid } from "./components/pokemon-grid";
import { loadPokemonList } from "@/lib/pokemonAPI";

export default async function Home() {
    const pokemonList = await loadPokemonList();
    return (
        <div className="items-center h-full">
            <PokemonGrid pokemonList={pokemonList} />
        </div>
    );
}
