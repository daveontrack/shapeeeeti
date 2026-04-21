# Email Configuration

This guide explains how to set up email functionality for form submissions.

## Contact and Volunteer Form Submissions

All form submissions (Contact Form, Volunteer Applications) are sent to: **info@shapethiopia.org**

## Email Setup Options

### Option 1: Using SMTP (Recommended for Production)

Set the following environment variables in your Vercel project settings or `.env.local`:

```
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_SECURE=false  # Set to 'true' for port 465
SMTP_FROM=noreply@shapethiopia.org
```

Popular SMTP services:
- **Gmail**: smtp.gmail.com (requires App Password)
- **SendGrid**: smtp.sendgrid.net
- **Mailgun**: smtp.mailgun.org
- **AWS SES**: email-smtp.region.amazonaws.com
- **Resend**: smtp.resend.com

### Option 2: Development Mode (No SMTP Configured)

If SMTP credentials are not provided, the system will:
- Log form submissions to the server console
- Still show success messages to users
- Allow you to test the forms without external email service

To debug, check your server logs to see submitted form data.

## Environment Variables

Add these to your Vercel project:

1. Go to project Settings → Environment Variables
2. Add the SMTP variables above
3. Deploy your project

## Testing

1. Fill out the Contact Form at `/contact`
2. Submit the Volunteer Application at `/volunteer`
3. Check that emails are received at info@shapethiopia.org

For development without SMTP:
- Check server logs for form submission data
- Emails will log to console instead of sending

## API Endpoints

- `POST /api/contact` - Send contact form
- `POST /api/volunteer` - Send volunteer application

Both endpoints validate input and send emails to info@shapethiopia.org with reply-to set to the sender's email.
