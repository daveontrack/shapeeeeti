// app/api/test-resend/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY not configured in .env.local'
      }, { status: 500 })
    }

    // Send a test email
    const { data, error } = await resend.emails.send({
      from: 'SHAPEthiopia <onboarding@resend.dev>',
      to: ['dawitberiso406@gmail.com'],
      subject: '✅ Test Email - SHAPEthiopia Donation System',
      html: `
        <h2>Resend Email Test</h2>
        <p><strong>Status:</strong> ✅ Working!</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>API Key:</strong> ${process.env.RESEND_API_KEY.substring(0, 10)}...</p>
        <hr />
        <p>Your donation form is now ready to send thank you emails!</p>
      `,
    })

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully! Check your inbox.',
      data 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
};