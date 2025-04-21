import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const addUser = () => {
    fetch('/api/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name })
    }).then(() => {
      setName('');
      fetch('/api/users').then(res => res.json()).then(setUsers);
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Liste des utilisateurs</h1>
      <ul>{users.map(u => <li key={u._id}>{u.name}</li>)}</ul>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom"
      />
      <button onClick={addUser}>Ajouter</button>
    </div>
  );
}

export default App;
