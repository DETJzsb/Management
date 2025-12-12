// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #0070f3, #00c7ff)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            DZ
          </div>
          <div>
            <h1 style={{ 
              margin: '0',
              fontSize: '20px',
              color: '#333'
            }}>
              Draexlmaier ZSB Dashboard
            </h1>
            <p style={{ 
              margin: '5px 0 0 0',
              fontSize: '14px',
              color: '#666'
            }}>
              Welcome, {user.first_name} {user.last_name}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ 
              margin: '0',
              fontSize: '14px',
              color: '#333',
              fontWeight: 'bold'
            }}>
              {user.role} • {user.department}
            </p>
            <p style={{ 
              margin: '5px 0 0 0',
              fontSize: '12px',
              color: '#666'
            }}>
              Matricule: {user.matricule}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Welcome Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0070f3, #00c7ff)',
          color: 'white',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
            Welcome to Draexlmaier ZSB System
          </h2>
          <p style={{ margin: '0', fontSize: '16px', opacity: 0.9 }}>
            This is your dashboard. From here you can access all system features.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <Link href="/upload" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            display: 'block'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0070f3' }}>
              Upload Excel
            </h3>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              Upload weekly production plans
            </p>
          </Link>

          <Link href="/production" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            display: 'block'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>
              Production Lines
            </h3>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              View production lines and status
            </p>
          </Link>

          <Link href="/agents" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            display: 'block'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>
              Agents Management
            </h3>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              Manage feeding agents and tasks
            </p>
          </Link>

          <Link href="/reports" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            display: 'block'
          }}>
            <h3 style={{ margin: { margin: '0 0 10px 0', color: '#dc3545' }}>
              Reports
            </h3>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              View production reports and analytics
            </p>
          </Link>
        </div>

        {/* System Info */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>
            System Status
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                User Role
              </p>
              <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                {user.role}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                Department
              </p>
              <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                {user.department}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                Access Level
              </p>
              <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                {user.role === 'admin' ? 'Full Access' : 'Limited Access'}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                System Version
              </p>
              <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                v1.0.0 DEMO
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'white',
        padding: '20px',
        marginTop: '30px',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0' }}>
          Draexlmaier ZSB Logistics System • Demo Version
        </p>
        <p style={{ margin: '5px 0 0 0' }}>
          This is a demonstration system. Data is stored locally.
        </p>
      </footer>
    </div>
  );
}
