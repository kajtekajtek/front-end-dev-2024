'use strict';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const pokemon_list = document.getElementById('list');
const pokemon_details = document.getElementById('details');
const search_bar = document.getElementById('search');
const loading = document.getElementById('loading');

const pokemon_list_size = 20

// run the app
async function run() {
    fetchPokemonList()
        .then(data => displayPokemonList(data))
        .catch(error => console.error(error));
    
}

// show or hide loading "spinner" 
function displayLoading(isLoading) {
    loading.style.display = isLoading ? 'block' : 'none';
}

// get pokemon list
async function fetchPokemonList() {
    try {
        displayLoading(true);

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

// display pokemon list
function displayPokemonList(data) {
    pokemon_list.innerHTML = '';

    // create a list item for each pokemon
    data.forEach((pokemon, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <h3>${pokemon.name} #${index + 1}</h3>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="${pokemon.name}">
        `;

        // fetch pokemon details on click and display them
        li.addEventListener('click', () => fetchPokemonDetails(index + 1)
                .then(data => displayPokemonDetails(data))
                .catch(error => console.error(error)));

        pokemon_list.appendChild(li);
    });
}

// get pokemon details
async function fetchPokemonDetails(id) {
    try {
        displayLoading(true);

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
// display pokemon details
function displayPokemonDetails(pokemon) {
    pokemon_details.innerHTML = `
        <h3>${pokemon.name}</h3>
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

search_bar.addEventListener('input', (event) => {
    // get search value
    const search_val = search_bar.value.toLowerCase();
    // get all pokemon items from the list
    const pokemon_items = document.querySelectorAll('#list li');
    // filter pokemon items based on search value
    pokemon_items.forEach(item => {
        const pokemon_name = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = pokemon_name.includes(search_val) ? 'flex' : 'none';
    })
})

run();