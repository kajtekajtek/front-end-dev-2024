// app/components/compare.js - pokemon comparison component
import { useEffect, useState } from 'react';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export default function Compare({ compareList, clearCompare }) {
    const [pokemon1, setPokemon1] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);

    // fetch selected pokemon details
    useEffect(() => {
        const fetchPokemonDetails = async (id1, id2) => {
            try {
                const response1 = await fetch(`${API_URL}${id1}`);

                if (!response1.ok) throw new Error('Failed to fetch pokemon details');

                const data1 = await response1.json();

                setPokemon1(data1);

                const response2 = await fetch(`${API_URL}${id2}`);

                if (!response2.ok) throw new Error('Failed to fetch pokemon details');

                const data2 = await response2.json();

                setPokemon2(data2);
            } catch (error) {
                console.error(error);
            }
        };

        if (compareList.length === 2) 
            fetchPokemonDetails(compareList[0].id, compareList[1].id);
    }, [compareList]);

    if (compareList.length != 2) {
        return null
    }

    return (
        <section className="compare">
            <h2>Compare Pokemons</h2>
            <button className="toggleBtn" onClick={clearCompare}>Clear Comparison</button>
            <div className="compareContainer">
            {!pokemon1 || !pokemon2 ? (
                <p>Loading...</p> 
            ):(
                <>
                <div className="comparedPokemon">
                    <h3>{pokemon1.name}</h3>
                    <img src={pokemon1.sprites.front_default} alt="{pokemon1.name}"/>
                    <p><strong>Type:</strong> {pokemon1.types.map(type => type.type.name).join(', ')}</p>
                    <p><strong>Height:</strong> {pokemon1.height / 10} m</p>
                    <p><strong>Weight:</strong> {pokemon1.weight / 10} kg</p>
                    <h4>Stats:</h4>
                    <ul>
                    {pokemon1.stats.map((stat, id) => (
                        <li key={id}>
                            {stat.stat.name}: {stat.base_stat}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="comparedPokemon">
                    <h3>{pokemon2.name}</h3>
                    <img src={pokemon2.sprites.front_default} alt="{pokemon2.name}"/>
                    <p><strong>Type:</strong> {pokemon2.types.map(type => type.type.name).join(', ')}</p>
                    <p><strong>Height:</strong> {pokemon2.height / 10} m</p>
                    <p><strong>Weight:</strong> {pokemon2.weight / 10} kg</p>
                    <h4>Stats:</h4>
                    <ul>
                    {pokemon2.stats.map((stat, id) => (
                        <li key={id}>
                            {stat.stat.name}: {stat.base_stat}
                        </li>
                    ))}
                    </ul>
                </div>
                </>
            )}
            </div>
        </section>
    );
};