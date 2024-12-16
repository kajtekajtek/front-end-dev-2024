import Link from 'next/link';
// app/components/PokemonList.js - pokemon list component
export default function PokemonList({ pokemons }) {
    if (!pokemons.length) {
        return <p>Not found...</p>;
    }

    return (
        <ul className="pokemonList">
            {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        <Link href={`/pokemon/${pokemon.id}`}>
                            <span>{pokemon.name} #{index + 1}</span>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                alt={pokemon.name}
                            />
                        </Link>
                    </li>
            ))}
        </ul>
    );
}