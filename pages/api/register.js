// pages/api/register.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { matricule } = req.body;

    // Validate matricule
    if (!matricule || matricule.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Matricule is required' 
      });
    }

    // Prevent demo account registration
    if (matricule.toUpperCase() === 'DEMO001') {
      return res.status(400).json({ 
        success: false, 
        message: 'This matricule is reserved for demo' 
      });
    }

    // In real app, you would save to Supabase here
    // For demo, we'll simulate saving
    
    console.log(`New registration request: ${matricule}`);
    
    // Simulate database save
    const registrationRequest = {
      id: Date.now(),
      matricule: matricule.toUpperCase(),
      requested_at: new Date().toISOString(),
      status: 'pending',
      notes: 'Awaiting admin approval'
    };

    return res.status(200).json({
      success: true,
      message: 'Registration request submitted successfully',
      request_id: registrationRequest.id,
      data: registrationRequest
    });

  } catch (error) {
    console.error('Registration API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
}
