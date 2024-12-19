// app/pokemon/page.js - pokemon list
'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PokemonList from '../components/PokemonList';
import FilterBar from '../components/FilterBar';

const API_URL = 'https://pokeapi.co/api/v2/';

export default function PokemonPage({ searchParams }) {
    // states
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ filteredPokemonList, setFilteredPokemonList ] = useState([]);
    const [ favorites, setFavorites ] = useState([]);
    const [ type, setType ] = useState('all'); // Dodana zmienna "type" jako stan
    const [ limit, setLimit ] = useState(20);

    // search parameters
    const params = use(searchParams);
    const search = params.search || '';

    const router = useRouter();

    // function for adding/removing pokemon to/from favorites
    const addToFavorites = (pokemon) => {
        let updatedFavorites;
        // remove from favorites if pokemon is already in favorites
        if (favorites.map((fav) => fav.id).includes(pokemon.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
        
        // add to favorites if pokemon is not in favorites
        } else {
            updatedFavorites = [...favorites, pokemon];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    // function to filter pokemon list by name
    const handleSearch = (query) => {
        if (!query) {
            setFilteredPokemonList(pokemonList);
            return;
        }

        const filteredList = filteredPokemonList.filter((pokemon) => 
            pokemon.name.toLowerCase().includes(query.toLowerCase()));
        
        setFilteredPokemonList(filteredList);
    };

    // fetch pokemon list on component mount
    useEffect(() => {
        const getPokemonList = async () => {
            try {
                // fetch data from the API
                const response = await fetch(`${API_URL}pokemon/?limit=${limit}`);

                if (!response.ok) throw new Error('Failed to fetch pokemon list');

                const data = await response.json();

                // map index and type to each pokemon
                const parsedData = await Promise.all(
                    data.results.map(async (pokemon, index) => {
                        pokemon.id = index + 1;

                        const res = await fetch(`${API_URL}/pokemon/${pokemon.id}`);
                        if (!res.ok) {
                            pokemon.type = [];
                            return pokemon;
                        }
                        const pokemonData = await res.json();

                        pokemon.type = pokemonData.types.map(t => t.type.name);
                        return pokemon;
                    })
                );

                setPokemonList(parsedData);
            } catch (error) {
                console.error(error);
            }
        };

        getPokemonList();
    // rerun the effect when the limit param changes
    }, [limit]);

    // filter pokemon list by type when type param or pokemonList changes
    useEffect(() => {
        if (type === 'all') {
            setFilteredPokemonList(pokemonList);
        } else {
            setFilteredPokemonList(pokemonList.filter((pokemon) => pokemon.type.includes(type)));
        }
    }, [type, pokemonList]);

    // load favorites from local storage on component mount
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    // get type from searchParams on component mount
    useEffect(() => {
        const type = params.type || 'all';
        setType(type);
    }, []);

    // get limit from searchParams on component mount
    useEffect(() => {
        const limit = params.limit || 20;
        setLimit(limit);
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
                <h2>Pokemon List</h2>
                <FilterBar filter={type} setFilter={(event) => {
                    const currentParams = new URLSearchParams(window.location.search);
                    currentParams.set('type', event.target.value);
                    setType(event.target.value); // Aktualizacja zmiennej "type" za pomocą setType
                    router.push(`/pokemon?${currentParams.toString()}`);
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
