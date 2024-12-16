'use client';
import { use, useEffect, useState } from 'react';
// app/pokemon/[id]/page.js - pokemon details page
import PokemonDetails from '../../components/PokemonDetails.js';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export default function PokemonDetailsPage({ params }) {
    const [ pokemon, setPokemon ] = useState(null);
    const { id } = use(params);

    // fetch selected pokemon details
    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`${API_URL}${id}`);

                if (!response.ok) throw new Error('Failed to fetch pokemon details');

                const data = await response.json();

                setPokemon(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPokemonDetails();
    }, []);

    return (
        <section className="pokemonDetails">
            <PokemonDetails selectedPokemon={pokemon} />
        </section>
    )
}