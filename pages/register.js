// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [matricule, setMatricule] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricule })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({
          type: 'success',
          text: '✅ Registration request submitted successfully! Your request will be reviewed by administration.'
        });
        setMatricule(''); // Clear the field
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: `❌ ${data.message}`
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: '❌ Network error. Please try again.'
      });
      console.error('Registration error:', error);
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
        maxWidth: '500px',
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
            Request Registration
          </h1>
          <p style={{ 
            color: '#666',
            margin: '0',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Enter your matricule number to request access to the system.
            Your request will be reviewed by administration.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your employee matricule"
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
              Example: EMP001, AGENT123, SUP456
            </small>
          </div>

          {message && (
            <div style={{
              padding: '12px',
              background: message.type === 'success' ? '#d4edda' : '#f8d7da',
              border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '5px',
              marginBottom: '20px',
              color: message.type === 'success' ? '#155724' : '#721c24',
              fontSize: '14px'
            }}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '14px',
              background: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>

        {/* Process Information */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#e8f4fd',
          borderRadius: '5px',
          border: '1px solid #b6d4fe'
        }}>
          <h3 style={{ 
            margin: '0 0 10px 0',
            color: '#084298',
            fontSize: '16px'
          }}>
            Registration Process:
          </h3>
          <ol style={{ 
            margin: '0',
            paddingLeft: '20px',
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            <li>Submit your matricule number</li>
            <li>Administration reviews your request</li>
            <li>If approved, you will receive notification</li>
            <li>Login with your matricule and password: <code>drax123</code></li>
            <li>Complete your personal information</li>
          </ol>
        </div>

        {/* Login Link */}
        <div style={{ 
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#666'
        }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#0070f3', textDecoration: 'none' }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
