import React, { useState } from 'react';
import './NoteForm.css';

const NoteForm = ({ onAddNote }) => {
  const [newNote, setNewNote] = useState({ title: '', body: '' });
  const [remainingTitleCharacters, setRemainingTitleCharacters] = useState(50);
  const [remainingBodyCharacters, setRemainingBodyCharacters] = useState(200);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      const charactersLeft = 50 - value.length;
      setRemainingTitleCharacters(charactersLeft >= 0 ? charactersLeft : 0);
    } else if (name === 'body') {
      const charactersLeft = 200 - value.length;
      setRemainingBodyCharacters(charactersLeft >= 0 ? charactersLeft : 0);
    }

    if (value.length <= 50 || (name === 'body' && value.length <= 200)) {
      setNewNote({ ...newNote, [name]: value });
    }
  };

  const addNote = () => {
    if (newNote.title.trim() === '' || newNote.body.trim() === '') {
      alert('Judul dan isi catatan tidak boleh kosong.');
      return;
    }

    onAddNote(newNote);
    setNewNote({ title: '', body: '' });
    setRemainingTitleCharacters(50);
    setRemainingBodyCharacters(200);
  };

  return (
    <div className="form-container">
      <input
        type="text"
        className="form-control"
        placeholder="Judul"
        name="title"
        value={newNote.title}
        onChange={handleChange}
      />
      <small className="text-muted">
        Karakter tersisa (Judul): {remainingTitleCharacters}
      </small>
      <textarea
        placeholder="Isi catatan"
        className="form-control"
        name="body"
        value={newNote.body}
        onChange={handleChange}
      />
      <small className="text-muted">
        Karakter tersisa (Isi): {remainingBodyCharacters}
      </small>
      <div>
        <button onClick={addNote} className="btn btn-success mt-2">
          Tambah Catatan
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
