import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        text: note,
        date: new Date().toLocaleDateString('he-IL')
      };
      setNotes([newNote, ...notes]);
      setNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
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
