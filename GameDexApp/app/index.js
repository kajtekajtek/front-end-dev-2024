const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonListSize = 20

// fetch pokemon list
async function fetchPokemonList() {
    try {
        // fetch pokemon list of size pokemonListSize
        const response = await fetch(`${API_URL}?limit=${pokemonListSize}`);

        if (!response.ok) throw new Error('Could not retrieve pokemon list');

        const data = await response.json();

        return data.results;
    } catch (error) {
        throw error;
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"))
/* fetch pokemon list and render the App component with the data received 
    from the API */
fetchPokemonList()
    .then(data => root.render(
        <App
            pokemons={data}
            selectedPokemon={null}
        />,
    ))
    .catch(error => console.log(error))