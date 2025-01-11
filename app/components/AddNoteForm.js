// app/components/AddNoteForm.js - form to add a new pokemon note import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddNoteForm({ pokemonId, onSubmitCallback }) {
    // define the form validation schema
    const NoteSchema = Yup.object().shape({
        tacticName: Yup.string().required("Tactic name is required")
            .min(5, "Tactic name must be at least 5 characters")
            .max(50, "Tactic name must be at most 50 characters"),
        strategy: Yup.string().required("Strategy is required").min(10, "Strategy must be at least 10 characters"),
        effectiveness: Yup.number().required("Effectiveness is required")
            .min(1, "Effectiveness must be at least 1")
            .max(5, "Effectiveness must be at most 5"),
        conditions: Yup.string().required("Conditions are required")
            .min(10, "Conditions must be at least 10 characters"),
        trainingDate: Yup.date().required("Training date is required"),
        opponents: Yup.array().of(Yup.string().required("Opponent is required"))
            .min(1, "At least one opponent is required")
    });

    // initial form values
    const initialValues = {
        tacticName: "",
        strategy: "",
        effectiveness: 1,
        conditions: "",
        trainingDate: new Date().toISOString().split("T")[0],
        opponents: []
    };

    const onSubmit = (values, { resetForm }) => {
        // create a new note object
        const note = {
            id: crypto.randomUUID(),
            pokemonId,
            ...values,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // store the note in local storage
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        localStorage.setItem("notes", JSON.stringify([...storedNotes, note]));
        // notify the parent component
        onSubmitCallback(note);

        resetForm();
    }

    return (
        <div className="add-note-form">
            <h2>Add Training Note</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={NoteSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="tacticName">Tactic Name</label>
                            <Field name="tacticName" type="text" />
                            <ErrorMessage name="tacticName" component="div" className="error"/>
                        </div>
                        <div>
                            <label htmlFor="strategy">Strategy</label>
                            <Field name="strategy" as="textarea" />
                            <ErrorMessage name="strategy" component="div" className="error"/>
                        </div>
                        <div>
                            <label htmlFor="effectiveness">Effectiveness</label>
                            <Field name="effectiveness" as="select">
                                <option value="">Select</option>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <option key={value} value={value}>{value}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="effectiveness" component="div" className="error"/>
                        </div>
                        <div>
                            <label htmlFor="conditions">Conditions</label>
                            <Field name="conditions" as="textarea" />
                            <ErrorMessage name="conditions" component="div" className="error"/>
                        </div>
                        <div>
                            <label htmlFor="trainingDate">Training Date</label>
                            <Field name="trainingDate" type="date" />
                            <ErrorMessage name="trainingDate" component="div" className="error"/>
                        </div>
                        <div>
                            <label htmlFor="opponents">Opponents</label>
                            <Field name="opponents" as="select" multiple>
                                {[
                                    "Bug",
                                    "Dark",
                                    "Dragon",
                                    "Electric",
                                    "Fairy",
                                    "Fighting",
                                    "Fire",
                                    "Flying",
                                    "Ghost",
                                    "Grass",
                                    "Ground",
                                    "Ice",
                                    "Normal",
                                    "Poison",
                                    "Psychic",
                                    "Rock",
                                    "Steel",
                                    "Water"
                                ].map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="opponents" component="div" className="error"/>
                        </div>
                        <button type="submit" disabled={isSubmitting}>Add Note</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}