import {getPokemon, getPokemonEvolutions} from "@/lib/pokemonAPI";
import PokemonCry from "@/app/components/pokemon-cry";
import Link from 'next/link';
import {typeColors} from "@/lib/typeColors";

export default async function PokemonPage({params}: { params: Promise<{ pokemonName: string }> }) {
    const {pokemonName} = await params;
    const pokemonObject = await getPokemon(pokemonName);
    const evolutions = await getPokemonEvolutions(pokemonName);
    console.log("Types:", pokemonObject.types);

    return (
        <>
            <div className="pb-28">
            <div className="max-w-xl mx-auto">
                <div className="bg-white shadow-lg rounded-2xl p-6 text-center mb-6">
                    <h1 className="text-3xl font-bold mb-4 capitalize">{pokemonName}</h1>
                    <img
                        src={pokemonObject.sprites.other['official-artwork'].front_default}
                        alt={pokemonName}
                        className="w-48 h-48 object-contain mx-auto"
                    />
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mb-6 mx-auto">
                <div className="text-center">
                    {pokemonObject.types && (
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold mb-2">Type{pokemonObject.types.length > 1 ? "s" : ""}</h2>
                            <div className="flex flex-wrap justify-center gap-2">
                                {pokemonObject.types.map((typeObj: any, index: number) => (

                                    <span
                                        key={`${typeObj.type.name}-${index}`}
                                        className={`px-3 py-1 rounded-full text-sm text-white capitalize ${typeColors[typeObj.type.name] || "bg-gray-400"}`}>
                                    {typeObj.type.name}
                                </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 max-w-lg text-center mx-auto">
                <h2 className="text-xl font-semibold mb-4">Stats</h2>
                <div className="space-y-2">
                    {pokemonObject.stats.map((stat: any) => (
                        <div key={stat.stat.name} className="flex justify-between border-b pb-1 text-sm">
                            <span className="capitalize text-gray-600">{stat.stat.name}</span>
                            <span className="font-bold text-gray-900">{stat.base_stat}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <h2 className="text-lg font-semibold mb-2">Abilities</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {pokemonObject.abilities.map((ability: any, index: number) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
                            {ability.ability.name}
                        </span>
                        ))}
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <h2 className="text-lg font-semibold mb-2">Measurements</h2>
                    <p className="text-sm text-gray-600">
                        Height: <span className="font-bold">{pokemonObject.height / 10} m</span> |
                        Weight: <span className="font-bold">{pokemonObject.weight / 10} kg</span>
                    </p>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
                <h2 className="text-xl font-semibold mb-4">Evolution Chain</h2>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    {evolutions.map((poke) => (
                        <div key={poke.name}
                             className="bg-gray-100 rounded-xl shadow-md p-4 w-32 hover:shadow-lg transition-all text-center">
                            <img
                                src={poke.image}
                                alt={poke.name}
                                className="w-24 h-24 object-contain mx-auto mb-2"
                            />
                            <p className="capitalize text-sm font-semibold">{poke.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full bg-[#072ac8] rounded-t-[16px] px-4 py-2 z-50">
                <div className="w-full bg-[#fdd85d] rounded-[1000px] flex justify-center gap-4 p-4 mx-auto shadow-lg">
                    <PokemonCry id={pokemonObject.id}>Cries</PokemonCry>
                    <Link href="/">
                        <button
                            className="min-w-[90px] px-4 py-2 text-sm font-semibold text-black bg-white rounded-[1000px] hover:bg-white/90 transition-all duration-200 shadow-sm"
                        >
                            back
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}
