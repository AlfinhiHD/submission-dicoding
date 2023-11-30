// src/App.js
import React, { useState } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NoteList from './components/NoteList/NoteList';
import NoteForm from './components/NoteForm/NoteForm';
import ArchivePage from './pages//ArchivePage/ArchivePage';

const initialNotes = [
  {
    id: 1,
    title: "Babel",
    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
    archived: false,
    createdAt: '2022-04-14T04:27:34.572Z'
  },
];

const App = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const addNote = (newNote) => {
    if (!newNote.title.trim() || !newNote.body.trim()) {
      alert('Judul dan isi catatan tidak boleh kosong.');
      return;
    }
  
    if (newNote.title.length > 50) {
      alert('Judul catatan tidak boleh lebih dari 50 karakter.');
      return;
    }
  
    const newId = +new Date();
    const newNoteWithId = {
      ...newNote,
      id: newId,
      archived: false,
      createdAt: moment().toISOString(),
    };
  
    setNotes([...notes, newNoteWithId]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setArchivedNotes((prevArchivedNotes) => prevArchivedNotes.filter((note) => note.id !== id));
  };

  const archiveNote = (id, isArchived) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, archived: isArchived } : note
    );

    const archivedNote = notes.find((note) => note.id === id);
    if (archivedNote && isArchived) {
      setNotes(updatedNotes.filter((note) => note.id !== id));
      setArchivedNotes((prevArchivedNotes) => [...prevArchivedNotes, archivedNote]);
    } else {
      setNotes(updatedNotes);
    }
  };

  const unarchiveNote = (id) => {
    const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);
    const unarchivedNote = archivedNotes.find((note) => note.id === id);

    if (unarchivedNote) {
      setArchivedNotes(updatedArchivedNotes);
      setNotes((prevNotes) => [...prevNotes, { ...unarchivedNote, archived: false }]);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center">Aplikasi Catatan Pribadi</h1>
        <h5 className='text-center'>By : Alfinhi Hajid Dhia</h5>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Link to="/arsip">
                  <button className="btn btn-primary mb-3">Catatan Terarsip</button>
                </Link>
                <NoteForm onAddNote={addNote} />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Cari catatan"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                {filteredNotes.length === 0 ? (
                  <p>Tidak ada catatan</p>
                ) : (
                  <NoteList
                    notes={filteredNotes}
                    onDelete={deleteNote}
                    onArchive={(id) => archiveNote(id, true)}
                    archiveButtonLabel="Archive"
                  />
                )}
              </div>
            }
          />

          <Route
            path="/arsip"
            element={
              <ArchivePage
                archivedNotes={archivedNotes}
                onDelete={deleteNote}
                onUnarchive={(id) => unarchiveNote(id)}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
