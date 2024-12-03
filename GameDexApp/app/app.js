'use strict';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const pokemon_list_size = 20

// main App component
function App() {

}

// render App component
function renderApp() {

}

// get pokemon list
async function fetchPokemonList() {
    try {
        // fetch pokemon list of size pokemon_list_size
        const response = await fetch(`${API_URL}?limit=${pokemon_list_size}`);

        if (!response.ok) throw new Error('Could not retrieve pokemon list');

        const data = await response.json();
        
        return data.results;
    } catch (error) {
        throw error;
    } finally {
        displayLoading(false);
    }
}

// get pokemon details
async function fetchPokemonDetails(id) {
    try {
        // fetch chosen pokemon details
        const response = await fetch(`${API_URL}${id}`);

        if (!response.ok) throw new Error(`Couldn't retrieve #${id} pokemon details`);

        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    } finally {
        displayLoading(false);
    }
}

