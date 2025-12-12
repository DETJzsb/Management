// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Default password for all users
    const defaultPassword = 'drax123';

    if (password !== defaultPassword) {
      setError('Invalid password. Default password is: drax123');
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricule, password: defaultPassword })
    });

    const data = await response.json();
    
    if (data.success) {
      // Check if user needs to complete profile
      if (data.needsProfileCompletion) {
        router.push('/profile/complete');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="container">
      <h1>Login - Draexlmaier ZSB</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Matricule:</label>
          <input
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
            placeholder="Enter matricule"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="drax123"
          />
          <small>Default password: drax123</small>
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
      
      <div className="demo-info">
        <h3>Demo Access:</h3>
        <p>Matricule: DEMO001</p>
        <p>Password: drax123</p>
      </div>
    </div>
  );
}
