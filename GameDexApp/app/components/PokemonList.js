function PokemonList(props) {
    return (
        <ul id="list">
            {props.map((pokemon, index) => (
                <>
                    <li key={index} onClick={() => onPokemonClick(index + 1)}>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                            alt={pokemon.name}
                        />
                    </li>
                    <span>{pokemon.name} #{index + 1}</span>
                </>
            ))}
        </ul>
    );
}
