import Image from "next/image";
import { PokemonGrid } from "./components/pokemon-grid";
import { getPokemonList } from "../lib/pokemonAPI";

export default async function Home() {

  const pokemonList = await getPokemonList();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <PokemonGrid pokemonList={pokemonList} />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
