// app/pokemon/page.js - pokemon list
'use client';
import { useState, useEffect } from 'react';
import PokemonList from '../components/PokemonList';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const pokemonListSize = 20;

export default function PokemonPage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    // fetch pokemon list
    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch(`${API_URL}?limit=${pokemonListSize}`);

                if (!response.ok) throw new Error('Failed to fetch pokemon list');

                const data = await response.json();

                setPokemonList(data.results);
                setFilteredPokemonList(data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPokemonList();
    }, []);

    const handleSearch = (query) => {
        const filteredList = pokemonList.filter((pokemon) => 
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