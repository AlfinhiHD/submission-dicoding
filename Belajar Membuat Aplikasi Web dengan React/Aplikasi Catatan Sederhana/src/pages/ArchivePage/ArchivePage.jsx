import React from 'react';
import NoteList from '../../components/NoteList/NoteList';
import { Link } from 'react-router-dom';

const ArchivePage = ({ archivedNotes, onDelete, onUnarchive }) => (
  <div>
    <Link to="/">
      <button className="btn btn-primary mb-2">Kembali ke Halaman Utama</button>
    </Link>
    <h2 className="mt-2 mb-5 text-center">Halaman Arsip</h2>
    {archivedNotes.length === 0 ? (
      <p>Tidak ada catatan diarsipkan</p>
    ) : (
      <NoteList
        notes={archivedNotes}
        onDelete={onDelete}
        onArchive={(id) => onUnarchive(id)}
        archiveButtonLabel="Unarchive"
      />
    )}
  </div>
);

export default ArchivePage;
