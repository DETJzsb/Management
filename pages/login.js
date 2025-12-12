// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricule, password })
      });

      const data = await response.json();

      if (data.success) {
        // Save to localStorage (in real app, use cookies or session)
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        // Redirect based on user needs
        if (data.needsProfileCompletion) {
          router.push('/profile/complete');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Link href="/" style={{
            display: 'inline-block',
            marginBottom: '20px',
            textDecoration: 'none',
            color: '#333'
          }}>
            ← Back to Home
          </Link>
          <h1 style={{ 
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '24px'
          }}>
            Login
          </h1>
          <p style={{ 
            color: '#666',
            margin: '0',
            fontSize: '14px'
          }}>
            Enter your matricule and password
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Matricule Number
            </label>
            <input
              type="text"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              required
              placeholder="Enter your matricule"
              style={{ 
                width: '100%', 
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="drax123"
              style={{ 
                width: '100%', 
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <small style={{ 
              display: 'block', 
              marginTop: '5px',
              color: '#666',
              fontSize: '12px'
            }}>
              Default password for all users: <code>drax123</code>
            </small>
          </div>

          {error && (
            <div style={{
              padding: '12px',
              background: '#fee',
              border: '1px solid #f99',
              borderRadius: '5px',
              marginBottom: '20px',
              color: '#c00',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '14px',
              background: loading ? '#ccc' : '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Info */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '5px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ 
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '16px'
          }}>
            Demo Accounts:
          </h3>
          <div style={{ fontSize: '14px', color: '#666' }}>
            <p style={{ margin: '5px 0' }}>
              <strong>DEMO001</strong> - Administrator (Full access)
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>AGENT001</strong> - Agent (Basic access)
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Password for both:</strong> drax123
            </p>
          </div>
        </div>

        {/* Register Link */}
        <div style={{ 
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#666'
        }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: '#0070f3', textDecoration: 'none' }}>
            Request registration
          </Link>
        </div>
      </div>
    </div>
  );
}
