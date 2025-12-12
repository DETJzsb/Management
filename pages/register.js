// pages/register.js
import { useState } from 'react';

export default function RegisterPage() {
  const [matricule, setMatricule] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricule })
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="container">
      <h1>Register - Draexlmaier ZSB</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matricule Number:</label>
          <input
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
            placeholder="Enter your matricule"
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        After submission, your request will be reviewed by administration.
        You will receive notification when approved.
      </p>
    </div>
  );
}
