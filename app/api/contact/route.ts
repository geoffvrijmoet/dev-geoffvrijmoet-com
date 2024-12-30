import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import nodemailer from 'nodemailer'

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not defined')
if (!process.env.EMAIL_APP_PASSWORD) throw new Error('EMAIL_APP_PASSWORD is not defined')
if (!process.env.EMAIL_FROM) throw new Error('EMAIL_FROM is not defined')
if (!process.env.EMAIL_TO) throw new Error('EMAIL_TO is not defined')

const uri = process.env.MONGODB_URI
const emailPassword = process.env.EMAIL_APP_PASSWORD
const emailFrom = process.env.EMAIL_FROM
const emailTo = process.env.EMAIL_TO

interface ContactFormData {
  name: string
  email: string
  message: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailFrom,
    pass: emailPassword
  }
})

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactFormData
    const client = await MongoClient.connect(uri)
    const db = client.db('dev_geoffvrijmoet_com')
    
    // Store in MongoDB
    await db.collection('contacts').insertOne({
      ...body,
      createdAt: new Date(),
    })

    // Send email
    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: `[DEV.GEOFFVRIJMOET.COM] New Contact Form Submission from ${body.name}`,
      text: `
Name: ${body.name}
Email: ${body.email}
Message: ${body.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${body.name}</p>
<p><strong>Email:</strong> ${body.email}</p>
<p><strong>Message:</strong> ${body.message}</p>
      `
    })

    await client.close()

    return NextResponse.json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: `Failed to send message: ${error}` },
      { status: 500 }
    )
  }
} 