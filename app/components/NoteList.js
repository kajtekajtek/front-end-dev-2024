// app/components/NoteList.js - list, edit and delete notes
import React, { useState, useEffect } from "react";
import EditNoteForm from "./EditNoteForm";
import AddNoteForm from "./AddNoteForm";

export default function NoteList({ pokemonId }) {
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [addingNote, setAddingNote] = useState(false);

    // get notes from local storage and filter by pokemonId
    const refreshNotes = () => {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(storedNotes.filter(note => note.pokemonId === pokemonId));
    };    

    // handle note deletion
    const deleteNote = (id) => {
        // filter out the note with the given id
        const updatedNotes = notes.filter(note => note.id !== id);
        // save the updated notes in the state and local storage
        localStorage.setItem(`notes`, JSON.stringify(updatedNotes));
        refreshNotes();
    };

    // handle note editing
    const updateNote = (updatedNote) => {
        // update the note with the given id
        const updatedNotes = notes.map(note => 
            note.id === updatedNote.id ? updatedNote : note);
        // save the updated notes in the state and local storage
        localStorage.setItem(`notes`, JSON.stringify(updatedNotes));
        refreshNotes();
        setEditingNote(null);
    };

    // sort notes by date
    const sortNotesByDate = () => {
        refreshNotes();
        const sortedNotes = [...notes].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        localStorage.setItem(`notes`, JSON.stringify(sortedNotes));
        refreshNotes();
    }

    useEffect(() => {
        refreshNotes();
    }, [pokemonId]);

    return (
        <div className="notes-list">
            <h3>Training Notes</h3>
            <button className="add-note-btn" onClick={() => setAddingNote(!addingNote)}>
                {addingNote ? "Close Note Form" : "Add Training Note"}
            </button>
            {addingNote && (
                <div className="modal">
                    <AddNoteForm pokemonId={pokemonId} 
                        onSubmit={(note) => {
                            const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
                            localStorage.setItem("notes", JSON.stringify([...storedNotes, note]));
                            refreshNotes();
                        }}
                    />
                </div>
            )}
            <button onClick={sortNotesByDate}>Sort by Date</button>
            {notes.length === 0 ? (
                <p>No notes available.</p>
            ) : (
                <ul>
                    {notes.map((note) => (
                        <li key={note.id}>
                            <strong>{note.tacticName}</strong> ({note.trainingDate})
                            <p>{note.strategy}</p>
                            <p>Effectiveness: {note.effectiveness}</p>
                            <p>Conditions: {note.conditions}</p>
                            <p>Opponents: {note.opponents.join(", ")}</p>
                            <button onClick={() => setEditingNote(note)}>Edit</button>
                            <button onClick={() => deleteNote(note.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {editingNote && (
                <EditNoteForm 
                    note={editingNote}
                    onSubmit={updateNote}
                    onCancel={() => setEditingNote(null)}
                />
            )}
        </div>
    );
}