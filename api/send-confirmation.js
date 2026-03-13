module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, name, facility, lane, date, time, amount } = req.body;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'BatConnect <onboarding@resend.dev>',
        to: email,
        subject: 'Your Booking is Confirmed!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 32px; border-radius: 12px;">
            <h1 style="color: #e63946;">⚾ Booking Confirmed!</h1>
            <p>Hi ${name}, your batting cage booking is confirmed.</p>
            <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <p style="margin: 8px 0;"><strong>Facility:</strong> ${facility}</p>
              <p style="margin: 8px 0;"><strong>Lane:</strong> ${lane}</p>
              <p style="margin: 8px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 8px 0;"><strong>Time:</strong> ${time}</p>
              <p style="margin: 8px 0; color: #e63946;"><strong>Total Paid:</strong> $${amount}</p>
            </div>
            <p style="color: #aaaaaa;">See you at the cages!</p>
            <p style="color: #aaaaaa; font-size: 12px;">— The BatConnect Team</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to send email');
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
