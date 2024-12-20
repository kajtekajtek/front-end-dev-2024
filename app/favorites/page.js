// app/favorites/page.js - favorites page
'use client';
import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PokemonList from '../components/PokemonList';
import FilterBar from '../components/FilterBar';
import Compare from '../components/Compare';

const API_URL = 'https://pokeapi.co/api/v2/';

export default function FavoritesPage({ searchParams }) {
    // states
    const [ filteredPokemonList, setFilteredPokemonList ] = useState([]);
    const [ favorites, setFavorites ] = useState([]);
    const [ compareList, setCompareList ] = useState([]);
    // search parameters
    const [ type, setType ] = useState('all');
    const [ limit, setLimit ] = useState(20);
    const [ search, setSearch ] = useState(''); 
    const [ params ] = useState(use(searchParams));

    const router = useRouter();
    
    const addToCompare = (pokemon) => {
        console.log(pokemon);
        let updatedCompareList;
        // remove from comparison if pokemon is already in comparison
        if (compareList.map((c) => c.id).includes(pokemon.id)) {
            console.log(1)
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
    };

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

    // filter pokemon list by type when type param or favorites changes
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

    // handle search on search or favorites change
    useEffect(() => {
        if (!search) {
            setFilteredPokemonList(favorites);
            return;
        }

        const filteredList = filteredPokemonList.filter((pokemon) => 
            pokemon.name.toLowerCase().includes(search.toLowerCase()));
        
        setFilteredPokemonList(filteredList);
    }, [search, favorites ]);

    // update limit, type, and search when params change
    useEffect(() => {
        setLimit(params.limit || 20);
        setType(params.type || 'all');
        setSearch(params.search || '');
    }, [ params ]);

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
                <h2>Favorites List</h2>
                <FilterBar filter={type} setFilter={(event) => {
                    const currentParams = new URLSearchParams(window.location.search);
                    currentParams.set('type', event.target.value);
                    setType(event.target.value);
                    router.push(`/favorites?${currentParams.toString()}`);
                }} />
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