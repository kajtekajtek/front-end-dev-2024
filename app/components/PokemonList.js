// app/components/PokemonList.js - pokemon list component
import Link from 'next/link';

export default function PokemonList({ pokemons, favorites, addToFavorites }) {
    if (!pokemons.length) {
        return <p>Pokemons not found...</p>;
    }

    return (
        <ul className="pokemonList">
            {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        <button 
                            className="addToFavorites" 
                            onClick={() => addToFavorites(pokemon)}>
                            {favorites
                                .map((fav) => fav.id)
                                .includes(pokemon.id) 
                                ? '★' : '☆'}
                        </button>
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