import axios from 'axios'

const recaptchaVerify = async (
  gRecaptchaToken: string
): Promise<{ success: boolean; score?: number }> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  let res

  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`

  try {
    res = await axios.post('https://www.google.com/recaptcha/api/siteverify', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  } catch (e) {
    return { success: false }
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    return {
      success: true,
      score: res.data.score,
    }
  } else {
    return { success: false }
  }
}

export default recaptchaVerify
