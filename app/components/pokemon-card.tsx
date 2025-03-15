import Link from "next/link"

interface PokemonCardProps{
    name: string
}

export function PokemonCard({name} : PokemonCardProps){
    return(
        <Link
        href={name}
        key={name + "Card"}
        className="group rounded-lg boarder boarder-transparent m-3 px-5 py-4 transition-colors hover:border-gray-300 hover">
            <h2 className={'mb-3 text-2xl font-semibold'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </h2>
        </Link>

    )
}