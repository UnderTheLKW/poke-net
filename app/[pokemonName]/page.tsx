import {getPokemon, getPokemonEvolutions} from "@/lib/pokemonAPI";


export default async function PokemonPage({params}: { params: Promise<{ pokemonName: string }> }) {
    const {pokemonName} = await params;
    const pokemonObject = await getPokemon(pokemonName);
    const evolutions = await getPokemonEvolutions(pokemonName);


    return (
        <>
        <div className="max-w-xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center mb-6">
                <h1 className="text-3xl font-bold mb-4 capitalize">{pokemonName}</h1>
                <img
                    src={pokemonObject.sprites.other['official-artwork'].front_default}
                    alt={pokemonName}
                    className="w-48 h-48 object-contain mx-auto"
                />
            </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Stats</h2>
            <div className="space-y-2">
                {pokemonObject.stats.map((stat: any) => (
                    <div key={stat.stat.name} className="flex justify-between border-b pb-1 text-sm">
                        <span className="capitalize text-gray-600">{stat.stat.name}</span>
                        <span className="font-bold text-gray-900">{stat.base_stat}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Evolution Chain</h2>
            <div className="flex flex-wrap gap-6 items-center justify-center">
                {evolutions.map((poke) => (
                    <div key={poke.name} className="text-center">
                        <img src={poke.image} alt={poke.name} className="w-24 h-24 object-contain mx-auto"/>
                        <p className="capitalize mt-2 text-sm font-medium">{poke.name}</p>
                    </div>
                ))}
            </div>
        </div>
            <div className="w-full bg-[#072ac8] rounded-t-[16px] px-4 py-2">
                <div className="w-full bg-[#fdd85d] rounded-[1000px] flex justify-center gap-4 p-4 mx-auto shadow-lg">
                    <button
                        className="min-w-[90px] px-4 py-2 text-sm font-semibold text-black bg-white rounded-[1000px] hover:bg-white/90 transition-all duration-200 shadow-sm">
                        Cries
                    </button>
                    <button
                        className="min-w-[90px] px-4 py-2 text-sm font-semibold text-black bg-white rounded-[1000px] hover:bg-white/90 transition-all duration-200 shadow-sm">
                        back
                    </button>
                </div>
            </div>
</>
)
}
