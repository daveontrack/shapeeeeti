import nodemailer from 'nodemailer'

let transporter: any

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
} else {
  // Fallback for development - use nodemailer test account
  transporter = null
}

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

interface VolunteerEmailData {
  name: string
  email: string
  phone?: string
  interest: string
  message?: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, phone, subject, message } = data

  const htmlContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    <p><strong>Subject:</strong> ${subject}</p>
    <hr />
    <h3>Message:</h3>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `

  try {
    if (!transporter) {
      // Development mode - log to console
      console.log('[Contact Email]', {
        from: process.env.SMTP_FROM || 'noreply@shapethiopia.org',
        to: 'info@shapethiopia.org',
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: htmlContent,
      })
      return { success: true }
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@shapethiopia.org',
      to: 'info@shapethiopia.org',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: htmlContent,
    })
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendVolunteerEmail(data: VolunteerEmailData) {
  const { name, email, phone, interest, message } = data

  const htmlContent = `
    <h2>New Volunteer Application</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    <p><strong>Area of Interest:</strong> ${interest}</p>
    ${message ? `<hr /><h3>Message:</h3><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
  `

  try {
    if (!transporter) {
      // Development mode - log to console
      console.log('[Volunteer Email]', {
        from: process.env.SMTP_FROM || 'noreply@shapethiopia.org',
        to: 'info@shapethiopia.org',
        replyTo: email,
        subject: `Volunteer Application: ${name}`,
        html: htmlContent,
      })
      return { success: true }
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@shapethiopia.org',
      to: 'info@shapethiopia.org',
      replyTo: email,
      subject: `Volunteer Application: ${name}`,
      html: htmlContent,
    })
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
