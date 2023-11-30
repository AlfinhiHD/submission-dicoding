import React from 'react';
import { showFormattedDate } from '../../utils/showFormattedDate';

const NoteList = ({ notes, onDelete, onArchive, archiveButtonLabel }) => (
  <ul className="list-group">
    {notes.map((note) => (
      <li key={note.id} className="list-group-item">
        <h3>{note.title}</h3>
        <small className="text-muted">{showFormattedDate(note.createdAt)}</small>
        <p>{note.body}</p>
        <button onClick={() => onDelete(note.id)} className="btn btn-danger">
          Hapus
        </button>
        <button onClick={() => onArchive(note.id)} className="btn btn-secondary">
          {archiveButtonLabel}
        </button>
      </li>
    ))}
  </ul>
);

export default NoteList;
