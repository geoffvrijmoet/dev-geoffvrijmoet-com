import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import nodemailer from 'nodemailer'

const uri = process.env.MONGODB_URI
const emailPassword = process.env.EMAIL_APP_PASSWORD
const emailFrom = process.env.EMAIL_FROM
const emailTo = process.env.EMAIL_TO

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailFrom,
    pass: emailPassword
  }
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const client = await MongoClient.connect(uri as string)
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
    return NextResponse.json(
      { error: 'Failed to send message: ' + error },
      { status: 500 }
    )
  }
} 