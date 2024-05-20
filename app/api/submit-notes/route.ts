import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, EmailData } from 'lib/email'
import recaptchaVerify from 'lib/recaptchaVerify'

export async function POST(req: NextRequest) {
  const { link, contactInfo, title, name, message, gRecaptchaToken } = await req.json()

  if (!link || !title || !gRecaptchaToken) {
    return NextResponse.json(
      { error: 'Missing fields! "title", "link" and "gRecaptchaToken" are required fields.' },
      { status: 400 }
    )
  }

  const { success, score } = await recaptchaVerify(gRecaptchaToken)

  if (!success)
    return NextResponse.json(
      { error: 'Recaptcha verification failed. Please try again.' },
      { status: 400 }
    )

  const emailData: EmailData = {
    name,
    message,
    title,
    contactInfo,
    link,
  }

  try {
    await sendEmail(emailData)
  } catch (err) {
    return NextResponse.json(
      { error: 'Something went wrong! Please try again in some time.' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    {
      message: "Notes Submitted! They'll be available on the website in some time.",
    },
    { status: 201 }
  )
}
