// app/components/PokemonDetails.js - pokemon details component
import React, { useState } from 'react';
import AddNoteForm from './AddNoteForm';

export default function PokemonDetails({ selectedPokemon }) {
    if (!selectedPokemon) {
        return <p>Select a Pokemon to see its details</p>
    }

    const [showForm, setShowForm] = useState(false);

    return (
       <div className="details__content">
            <button className="add-note-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close Note Form" : "Add Training Note"}
            </button>
            {showForm && (
                <div className="modal">
                    <AddNoteForm pokemonId={selectedPokemon.id} 
                        onSubmit={(note) => {
                            alert(`Note added for ${selectedPokemon.name}`);
                            setShowForm(false);
                        }}
                    />
                </div>
            )}
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