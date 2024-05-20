'use client'

import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const RecaptchaWrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}>
      {children}
    </GoogleReCaptchaProvider>
  )
}

export default RecaptchaWrapper
