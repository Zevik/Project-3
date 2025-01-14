import { kv } from '@vercel/kv';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const savedNotes = await kv.get('notes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  };

  const addNote = async () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        text: note,
        date: new Date().toLocaleDateString('he-IL')
      };
      const updatedNotes = [newNote, ...notes];
      await kv.set('notes', updatedNotes);
      setNotes(updatedNotes);
      setNote('');
    }
  };

  const deleteNote = async (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    await kv.set('notes', updatedNotes);
    setNotes(updatedNotes);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNote();
    }
  };

  const filteredNotes = notes.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>הפתקים שלי</h1>
      </header>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="מה תרצה לרשום?"
        />
        <button className="add-button" onClick={addNote}>
          הוסף פתק +
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="input-field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חפש בפתקים..."
        />
      </div>

      <ul className="notes-list">
        {filteredNotes.map((n) => (
          <li key={n.id} className="note-item">
            <div>
              <p>{n.text}</p>
              <small>נוצר ב- {n.date}</small>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteNote(n.id)}
            >
              מחק
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
