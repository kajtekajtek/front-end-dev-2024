//  main App component
function App({ pokemons, selectedPokemon }) {
    // function to fetch chosen pokemon details
    async function fetchPokemonDetails(id) {
        try {
            // fetch chosen pokemon details
            const response = await fetch(`${API_URL}${id}`);

            if (!response.ok) throw new Error(`Couldn't retrieve #${id} pokemon details`);

            const data = await response.json();

            return data;
        } catch (error) {
            throw error;
        }
    }

    // function to show chosen pokemon details
    async function showPokemonDetails(id) {
        // fetch details of chosen pokemon
        fetchPokemonDetails(id)
            // render App again, this time with selectedPokemon  
            .then(pokemon => root.render(
                <App
                    pokemons={pokemons}
                    selectedPokemon={pokemon}
                />,
            ))
            .catch(error => console.log(error));
    }

    const state = {
        pokemons:[],
        state: null
    };

    state.pokemons = pokemons;
    state.selectedPokemon = selectedPokemon

    return (
        <div>
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
                    pokemons={state.pokemons} 
                    pokemonOnClick={showPokemonDetails}
                />
            </section>
            <section className="pokemonDetails">
                <h2>Pokemon Details</h2>
                <PokemonDetails 
                    selectedPokemon={state.selectedPokemon} 
                />
            </section>
        </div>
    )
}