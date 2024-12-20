// app/pokemon/page.js - pokemon list
'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PokemonList from '../components/PokemonList';
import FilterBar from '../components/FilterBar';
import Compare from '../components/Compare';

const API_URL = 'https://pokeapi.co/api/v2/';

export default function PokemonPage({ searchParams }) {
    // pokemon lists
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ filteredPokemonList, setFilteredPokemonList ] = useState([]);
    const [ favorites, setFavorites ] = useState([]);
    const [ compareList, setCompareList ] = useState([]);
    // search parameters
    const [ params ] = useState(use(searchParams));
    const [ type, setType ] = useState('all');
    const [ limit, setLimit ] = useState(20);
    const [ search, setSearch ] = useState('');

    const router = useRouter();

    const addToCompare = (pokemon) => {
        let updatedCompareList;
        // remove from comparison if pokemon is already in comparison
        if (compareList.map((c) => c.id).includes(pokemon.id)) {
            updatedCompareList = compareList.filter((c) => c.id !== pokemon.id);
        }
        // add to comparison if pokemon is not in comparison
        else {
            if (compareList.length < 2) {
                updatedCompareList = [...compareList, pokemon];

            } else {
                updatedCompareList = [compareList[1], pokemon];

            }
        }
        setCompareList(updatedCompareList);
        localStorage.setItem('lastComparison', JSON.stringify(updatedCompareList));
    };

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

    const updateType = (type) => {
        const currentParams = new URLSearchParams(window.location.search);

        // set type in state and local storage
        setType(type);
        localStorage.setItem('type', type);

        currentParams.set('type', type);

        router.push(`/pokemon?${currentParams.toString()}`);
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
                setFilteredPokemonList(parsedData);
            } catch (error) {
                console.error(error);
            }
        };

        getPokemonList();
    // rerun the effect when the limit param changes
    }, [limit]);

    // handle search on search or pokemonList change
    useEffect(() => {
        if (!search) {
            setFilteredPokemonList(pokemonList);
            return;
        }

        const filteredList = filteredPokemonList.filter((pokemon) => 
            pokemon.name.toLowerCase().includes(search.toLowerCase()));
        
        setFilteredPokemonList(filteredList);
    }, [search, pokemonList ]);

    // load states
    useEffect(() => {
        // load favorites from local storage
        setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);

        // load last comparison from local storage
        setCompareList(JSON.parse(localStorage.getItem('lastComparison')) || []);

        // if type is saved in local storage, load it from there
        if (localStorage.getItem('type')) {
            updateType(localStorage.getItem('type'))
        // if not, check if it's in the URL, and if not, set it to 'all'
        } else {
            setType(params.type || 'all');
        }

        setLimit(params.limit || 20);
    }, []);    

    // update limit, type, and search when params change
    useEffect(() => {
        setSearch(params.search || '');

        if (params.type) {
            updateType(params.type);
        }
    }, [ params ]);

    // filter pokemon list by type when type param or pokemonList changes
    useEffect(() => {
        if (type === 'all') {
            setFilteredPokemonList(pokemonList);
        } else {
            const filteredList = pokemonList.filter((pokemon) => pokemon.type.includes(type));
            setFilteredPokemonList(filteredList);
        }
    }, [ type, pokemonList ]);

    return (
        <>
            <section className="header">
                <h1>Game Dex</h1>
                <input 
                    type="text" 
                    className="searchBar" 
                    placeholder="Wyszukaj pokemona..."
                    onChange={(event) => setSearch(event.target.value)}>
                </input>
            </section>
            <section className="items">
                <h2>Pokemon List</h2>
                <FilterBar filter={type} setFilter={(e) => updateType(e.target.value)} />
                <PokemonList 
                    pokemons={filteredPokemonList} 
                    favorites={favorites}
                    addToFavorites={addToFavorites}
                    compareList={compareList}
                    addToCompare={addToCompare}
                />
                <Compare
                    compareList={compareList}
                    clearCompare={() => setCompareList([])}     
                />
            </section>
        </>
    )
}
