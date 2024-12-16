import { useState, useEffect } from 'react';
import Link from 'next/link';
// app/components/PokemonList.js - pokemon list component
export default function PokemonList({ pokemons }) {
    const [ favorites, setFavorites ] = useState([]);

    // load favorites from local storage on component mount
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    // function for adding/removing pokemon to/from favorites
    const addToFavorites = (pokemon) => {
        let updatedFavorites;
        // remove from favorites if pokemon is already in favorites
        if (favorites.includes(pokemon)) {
            updatedFavorites = favorites.filter((fav) => fav !== pokemon);
        
        // add to favorites if pokemon is not in favorites
        } else {
            updatedFavorites = [...favorites, pokemon];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    if (!pokemons.length) {
        return <p>Pokemons not found...</p>;
    }

    return (
        <ul className="pokemonList">
            {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        <button 
                            className="addToFavorites" 
                            onClick={() => addToFavorites(pokemon.name)}>
                            {favorites.includes(pokemon.name) ? '★' : '☆'}
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