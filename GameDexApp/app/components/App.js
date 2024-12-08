//  main App component
function App({ pokemons, selectedPokemon }) {
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
        }
    }

    const state = {
        pokemons:[],
        state: null
    };

    state.pokemons = pokemons;
    state.selectedPokemon = selectedPokemon
    console.log(state.selectedPokemon)

    return (
        <div>
            <section id="pokemonList">
                <h2>Pokemon List</h2>
                <PokemonList 
                    pokemons={state.pokemons} 
                    fetchPokemonDetails={fetchPokemonDetails}
                />
            </section>
            <section id="pokemonDetails">
                <h2>Pokemon Details</h2>
                <PokemonDetails 
                    selectedPokemon={state.selectedPokemon} 
                />
            </section>
        </div>
    )
}