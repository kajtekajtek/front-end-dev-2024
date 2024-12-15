// components/PokemonList.js - pokemon list component
export default function PokemonList({ pokemons }) {
    if (!pokemons.length) {
        return <p>Not found...</p>;
    }

    // get pokemon id from url
    const getPokemonId = (url) => {
        const match = url.match(/\/pokemon\/(\d+)\//);
        return match ? match[1] : null;
    };

    return (
        <ul className="pokemonList">
            {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        <span>{pokemon.name} #{index + 1}</span>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`}
                            alt={pokemon.name}
                        />
                    </li>
            ))}
        </ul>
    );
}