// pokemon details component
function PokemonDetails({ selectedPokemon }) {
    if (!selectedPokemon) {
        return <p>Select a Pokemon to see its details</p>
    }

    return (
       <div className="details__content">
            <h3>{selectedPokemon.name}</h3>
            <img src={selectedPokemon.sprites.front_default} alt="{selectedPokemon.name}"/>
            <p><strong>Type:</strong> {selectedPokemon.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Height:</strong> {selectedPokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {selectedPokemon.weight / 10} kg</p>
            <h4>Stats:</h4>
             <ul>
                {selectedPokemon.stats.map((stat, id) => (
                    <li key={id}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
        </div>
    );
}