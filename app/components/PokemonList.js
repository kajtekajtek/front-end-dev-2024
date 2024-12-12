// pokemon list component
function PokemonList({ pokemons, pokemonOnClick }) {
    return (
        <ul className="pokemonList">
            {pokemons.map((pokemon, index) => (
                    <li key={index} onClick={() => pokemonOnClick(index + 1)}>
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