// pokemon list component
function PokemonList({ pokemons, fetchPokemonDetails }) {
    // display pokemon details
    async function showPokemonDetails(id) {
        fetchPokemonDetails(id)
            .then(pokemon => root.render(
                <App
                    pokemons={pokemons}
                    selectedPokemon={pokemon}
                />,
            ))
            .catch(error => console.log(error));
    }

    return (
        <ul className="pokemonList">
            {pokemons.map((pokemon, index) => (
                    <li key={index} onClick={() => showPokemonDetails(index + 1)}>
                        <span>{pokemon.name} #{index + 1}</span>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                            alt={pokemon.name}
                        />
                    </li>
            ))}
        </ul>
    );
}