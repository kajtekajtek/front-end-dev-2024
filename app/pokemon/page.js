// app/pokemon/page.js - pokemon list
'use client';
import { use, useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';

const API_URL = 'https://pokeapi.co/api/v2/';

export default function PokemonPage({ searchParams }) {
    // states
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    // search parameters
    const type = use(searchParams).type || 'all';
    const limit = use(searchParams).limit || 20;
    const search = use(searchParams).search || '';

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

    // function to filter pokemon list by name
    const handleSearch = (query) => {
        const filteredList = filteredPokemonList.filter((pokemon) => 
            pokemon.name.toLowerCase().includes(query.toLowerCase()));
        
        setFilteredPokemonList(filteredList);
    };

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
                <PokemonList 
                    pokemons={filteredPokemonList} 
                />
            </section>
        </>
    )
}