'use strict';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonList = document.getElementById('list');
const pokemonDetails = document.getElementById('info');
const searchBar = document.getElementById('search');
const loading = document.getElementById('loading');

function displayLoading(isLoading) {
    loading.style.display = isLoading ? 'block' : 'none';
}

// get pokemon list
async function fetchPokemonList() {
    try {
        displayLoading(true);
        const response = await fetch(`${API_URL}?limit=20`);

        if (!response.ok) throw new Error('Nie udało sie pobrac listy pokemonow');

        const data = await response.json();
        displayPokemonList(data.results);
    } catch (error) {
        console.error(error);
    } finally {
        displayLoading(false);
    }
}

// display pokemon list
function displayPokemonList(data) {
    pokemonList.innerHTML = '';

    data.forEach((pokemon, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <h3>${pokemon.name} (#${index + 1})</h3>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="${pokemon.name}">
        `;

        listItem.addEventListener('click', () => fetchPokemonDetails(index + 1));

        pokemonList.appendChild(listItem);
    });
}

// get pokemon info
async function fetchPokemonDetails(id) {
    try {
        displayLoading(true);
        const response = await fetch(`${API_URL}${id}`);
        if (!response.ok) throw new Error("Nie udało się pobrać informacji o pokemonie");
        const data = await response.json();
        displayPokemonDetails(data);
    } catch (error) {
        console.error(error);
    } finally {
        displayLoading(false);
    }
}
// display pokemon info
function displayPokemonDetails(pokemon) {
    pokemonDetails.innerHTML = `
        <h3>${pokemon.name} (#${pokemon.id})</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
        <h4>Stats:</h4>
        <ul>
            ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
        </ul>
    `;
}

searchBar.addEventListener('input', (event) => {
    const searchValue = searchBar.ariaValueMax.toLowerCase();
    const pokemonItems = document.querySelectorAll('#list li');
    pokemonItems.forEach(item => {
        const pokemonName = item.querySelector('span').textContent.toLowerCase();
        item.style.display = pokemonName.includes(searchValue) ? 'flex' : 'none';
    })
})

fetchPokemonList();