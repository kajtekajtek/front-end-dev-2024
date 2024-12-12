// app/page.js - main page component
'use client';
import { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const pokemonListSize = 20;

export default function HomePage() {
    const [pokemonList, setPokemonList] = useState([]);

    // fetch pokemon list
    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch(`${API_URL}?limit=${pokemonListSize}`);

                if (!response.ok) throw new Error('Failed to fetch pokemon list');

                const data = await response.json();

                setPokemonList(data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPokemonList();
    }, []);

    return (
        <>
            <section className="header">
                <h1>Game Dex</h1>
                <input 
                    type="text" 
                    id="search"
                    className="searchBar" 
                    placeholder="Wyszukaj pokemona...">
                </input>
            </section>
            <section className="pokemonList">
                <h2>Pokemon List</h2>
                <PokemonList 
                    pokemons={pokemonList} 
                />
            </section>
        </>
    )
}