import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body
  
  // Set up email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'kevinmanickam.jk@gmail.com', // Always send to the user's email
    replyTo: email, // Set replyTo as the sender's email so they can reply directly
    subject: `New Portfolio Message from ${name}`,
    text: `You have received a new message from your portfolio contact form.\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}`
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Contact form submission sent successfully:', { name, email })
    res.json({ 
      success: true, 
      message: 'Thank you for your message! I\'ll get back to you soon.' 
    })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Oops! Something went wrong while sending your message. Please try again later.' 
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
