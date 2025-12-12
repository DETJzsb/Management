// pages/index.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
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
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Logo/Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #0070f3, #00c7ff)',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            DZ
          </div>
          <h1 style={{ 
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '28px'
          }}>
            Draexlmaier ZSB
          </h1>
          <p style={{ 
            color: '#666',
            margin: '0',
            fontSize: '16px'
          }}>
            Logistics Management System
          </p>
        </div>

        {/* Main Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link href="/login" style={{
            display: 'block',
            padding: '15px',
            background: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background 0.3s'
          }}>
            Login to System
          </Link>

          <Link href="/register" style={{
            display: 'block',
            padding: '15px',
            background: 'white',
            color: '#0070f3',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: '2px solid #0070f3',
            transition: 'background 0.3s'
          }}>
            Register New Account
          </Link>
        </div>

        {/* Demo Info */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '5px',
          border: '1px solid #e9ecef',
          textAlign: 'left'
        }}>
          <h3 style={{ 
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '16px'
          }}>
            Demo Access:
          </h3>
          <div style={{ fontSize: '14px', color: '#666' }}>
            <p style={{ margin: '5px 0' }}>
              <strong>Matricule:</strong> DEMO001
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Password:</strong> drax123
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Role:</strong> Administrator
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          background: '#fff8e1',
          borderRadius: '5px',
          border: '1px solid #ffeaa7',
          fontSize: '14px',
          color: '#856404'
        }}>
          <p style={{ margin: '0' }}>
            <strong>Note:</strong> This is a demo system. All users use the same password: <code>drax123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
