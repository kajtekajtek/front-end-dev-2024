// app/components/EditNoteForm.js - edit note form component
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function EditNoteForm({ note, onCancel, onSubmit }) {
    // form validation schema
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

    return (
        <Formik
            initialValues={{ ...note }}
            validationSchema={NoteSchema}
            onSubmit={(values) => {
                const updatedNote = { ...values, updatedAt: new Date().toISOString() };
                onSubmit(updatedNote);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="edit-note-form">
                    <h3>Edit Note</h3>

                    <label htmlFor="tacticName">Tactic Name</label>
                    <Field name="tacticName" type="text" />
                    <ErrorMessage name="tacticName" component="div" className="error" />

                    <label htmlFor="strategy">Strategy</label>
                    <Field name="strategy" as="textarea" />
                    <ErrorMessage name="strategy" component="div" className="error" />

                    <label htmlFor="effectiveness">Effectiveness</label>
                    <Field name="effectiveness" as="select">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="effectiveness" component="div" className="error" />

                    <label htmlFor="conditions">Conditions</label>
                    <Field name="conditions" as="textarea" />
                    <ErrorMessage name="conditions" component="div" className="error" />

                    <label htmlFor="trainingDate">Training Date</label>
                    <Field name="trainingDate" type="date" />
                    <ErrorMessage name="trainingDate" component="div" className="error" />

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
                            "Water",
                        ].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="opponents" component="div" className="error" />

                    <button type="submit" disabled={isSubmitting}>Save Changes</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </Form>
            )}
        </Formik>
    );
};