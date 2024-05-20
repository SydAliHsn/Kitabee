import nodemailer from 'nodemailer'

const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export interface EmailData {
  name?: string
  contactInfo?: string
  message?: string
  link: string
  title: string
}

export const sendEmail = async ({ message, name, link, contactInfo, title }: EmailData) => {
  const mailDetails = {
    from: 'kitabee',
    to: process.env.RECEIVING_EMAIL,
    subject: `Notes Submission by ${name || 'UNKNOWN'} on Kitabee.`,

    text: `\n
    Name: ${name || 'UNKNOWN'}\n
    Contact Info: ${contactInfo || 'UNKNOWN'}\n
    Notes Title: ${title}\n
    Notes Link: ${link}\n
    Message: ${message || 'No Message Provided'}`,
  }

  try {
    await mailTransporter.sendMail(mailDetails)
  } catch (err) {
    console.log(err)
    throw err
  }
}
