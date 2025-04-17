import { getPokemon } from "@/lib/pokemonAPI";
import { PokemonImage } from "../components/pokemon-image";


export default async function PokemonPage({ params } : {params: Promise<{ pokemonName: string }> }) {
    const { pokemonName } = await params;
    const pokemonObject = await getPokemon(pokemonName);

    return(
        <>
            <h1>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
            <PokemonImage
                name={pokemonName}
                image={pokemonObject.sprites.other['official-artwork'].front_default}
            />
        </>
    )
}
