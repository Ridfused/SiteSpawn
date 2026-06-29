import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = Number(process.env.OTP_PORT || 4000);
const otpStore = new Map();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailFrom = process.env.EMAIL_FROM || emailUser;

if (!emailUser || !emailPass) {
  console.warn('WARNING: EMAIL_USER and EMAIL_PASS must be set in .env');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

app.use(express.json());

app.post('/api/send-otp', async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(email.toLowerCase(), { code, expiresAt, name });

  if (!emailUser || !emailPass) {
    console.error('Missing email credentials, OTP not sent. Use .env EMAIL_USER and EMAIL_PASS.');
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  const message = `Hello ${name},\n\nYour SiteSpawn verification code is ${code}.\nIt expires in 5 minutes.\n\nIf you did not request this, ignore this email.`;

  try {
    await transporter.sendMail({
      from: emailFrom,
      to: email,
      subject: 'Your SiteSpawn OTP Code',
      text: message,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('OTP send failed', error);
    return res.status(500).json({ error: 'Failed to send OTP. Check email configuration.' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required.' });
  }

  const record = otpStore.get(email.toLowerCase());
  if (!record) {
    return res.status(400).json({ error: 'OTP expired or not requested.' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return res.status(400).json({ error: 'OTP expired. Request a new one.' });
  }

  if (record.code !== otp.trim()) {
    return res.status(400).json({ error: 'Invalid OTP.' });
  }

  otpStore.delete(email.toLowerCase());
  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`OTP backend running at http://localhost:${port}`);
});
