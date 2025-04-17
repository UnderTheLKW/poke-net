import Link from "next/link"

interface PokemonCardProps{
    name: string
    image: string
}

export function PokemonCard({ name, image } : PokemonCardProps){
    return(
        <Link
        href={name}
        key={name + "Card"}
        className="group rounded-lg boarder boarder-transparent transition-colors hover:border-gray-300 hover">
            <h2 className={'font-semibold'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </h2>
            <img src={image} alt={name} className="w-32 h-32 object-contain mx-auto"/>
        </Link>
    )
}
