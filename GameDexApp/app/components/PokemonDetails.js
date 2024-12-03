function PokemonDetails(pokemon) {
    return (
        <>
            <h2>Pokemon Details</h2> 
            <div class="details__content">
                <h3>${pokemon.name}</h3>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
                <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
                <h4>Stats:</h4>
                <ul>
                    ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
            </div>
        </>
    );
}