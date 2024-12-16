// app/favorites/page.js - favorites page
'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PokemonList from '../components/PokemonList';
import FilterBar from '../components/FilterBar';

const API_URL = 'https://pokeapi.co/api/v2/';

export default function FavoritesPage({ searchParams }) {
    // states
    const [ filteredPokemonList, setFilteredPokemonList ] = useState([]);
    const [ favorites, setFavorites ] = useState([]);
    // search parameters
    const params = use(searchParams);
    const type = params.type || 'all';
    const limit = params.limit || 20;
    const search = params.search || '';

    const router = useRouter();

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

    // function to filter pokemon list by name
    const handleSearch = (query) => {
        const filteredList = filteredPokemonList.filter((pokemon) => 
            pokemon.name.toLowerCase().includes(query.toLowerCase()));
        
        setFilteredPokemonList(filteredList);
    };

    // filter pokemon list by type when type param or pokemonList changes
    useEffect(() => {
        if (type === 'all') {
            setFilteredPokemonList(favorites);
        } else {
            setFilteredPokemonList(favorites.filter((pokemon) => pokemon.type.includes(type)));
        }
    }, [type, favorites]);

    // load favorites from local storage on component mount
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    return (
        <>
            <section className="header">
                <h1>Game Dex</h1>
                <input 
                    type="text" 
                    className="searchBar" 
                    placeholder="Wyszukaj pokemona..."
                    onChange={(event) => handleSearch(event.target.value)}>
                </input>
            </section>
            <section className="items">
                <h2>Favorites List</h2>
                <FilterBar filter={type} setFilter={(event) => {
                    const currentParams = new URLSearchParams(window.location.search);
                    currentParams.set('type', event.target.value);
                    router.push(`/favorites?${currentParams.toString()}`);
                }} />
                <PokemonList 
                    pokemons={filteredPokemonList} 
                    favorites={favorites}
                    addToFavorites={addToFavorites}
                />
            </section>
        </>
    )
}