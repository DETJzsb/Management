// pages/api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { matricule, password } = req.body;

    // Default password check
    if (password !== 'drax123') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid password. Use: drax123' 
      });
    }

    // In a real app, you would check against Supabase
    // For now, we'll simulate a successful login
    const users = {
      'DEMO001': {
        matricule: 'DEMO001',
        first_name: 'Demo',
        last_name: 'User',
        role: 'admin',
        department: 'COCPIT',
        personal_info_completed: true
      },
      'AGENT001': {
        matricule: 'AGENT001',
        first_name: 'Agent',
        last_name: 'One',
        role: 'agent',
        department: 'COCPIT',
        personal_info_completed: true
      }
    };

    const user = users[matricule];

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Matricule not found' 
      });
    }

    return res.status(200).json({
      success: true,
      user: user,
      needsProfileCompletion: !user.personal_info_completed,
      token: 'demo-token-123' // In real app, use JWT
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
}
