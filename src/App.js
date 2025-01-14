import React, { useState } from 'react';

function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
      setNote('');
    }
  };

  const filteredNotes = notes.filter((n) =>
    n.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>רישום פתקים</h1>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="הכנס פתק חדש"
      />
      <button onClick={addNote}>הוסף פתק</button>
      <br />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="חפש פתקים"
      />
      <ul>
        {filteredNotes.map((n, index) => (
          <li key={index}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
