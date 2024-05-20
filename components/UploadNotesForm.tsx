'use client'

import React, { FormEventHandler, useRef, useState } from 'react'
import Link from 'next/link'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Modal } from 'react-responsive-modal'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { BsSendCheck } from 'react-icons/bs'
import axios from 'axios'

const UploadNotesForm = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [error, setError] = useState<string>('')
  const [open, setOpen] = useState(false)

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    setError('')
    setStatus('loading')

    if (!executeRecaptcha) {
      console.log('not available to execute recaptcha')
      return
    }

    let gRecaptchaToken
    try {
      gRecaptchaToken = await executeRecaptcha('notesSubmit')
    } catch (err) {
      return setError('ReCaptcha failed! Please try again.')
    }

    const formData = new FormData(formRef.current as HTMLFormElement)
    formData.append('gRecaptchaToken', gRecaptchaToken)

    try {
      const response = await axios({
        method: 'POST',
        url: '/api/submit-notes',
        data: Object.fromEntries(formData.entries()),
      })

      if (response.status === 201) {
        formRef.current?.reset()
        setOpen(true)
      } else {
        setError(response.data.error || 'An error occured. Please try again.')
      }
    } catch (e) {
      setError('An error occured. Please try again.')
    }

    setStatus('idle')
  }

  const renderButtonContent = () => {
    switch (status) {
      case 'success':
        return (
          <>
            Done! <BsSendCheck className="text-xl" />
          </>
        )

      case 'loading':
        return (
          <>
            Submitting... <CgSpinnerTwoAlt className="animate-spin text-xl" />{' '}
          </>
        )

      default:
        return <>Submit </>
    }
  }

  return (
    <form className="mt-12" ref={formRef} onSubmit={handleSubmit}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{ modal: 'modal', overlay: 'overlay', closeButton: 'close-btn' }}
      >
        <h2 className="text-xl font-bold">Notes Submitted!</h2>
        <p className="pt-4">
          Thanks a lot for submitting your notes. Your notes will be reviewed by our team and will
          be available for students to access and download soon.
        </p>
        <button
          onClick={() => setOpen(false)}
          className="mt-6 w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-lg font-bold text-white shadow-sm hover:bg-blue-600 dark:hover:bg-blue-400"
        >
          Okay
        </button>
      </Modal>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700 dark:text-gray-200">
            Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            className="mt-1 w-full rounded-lg border px-4 py-3 placeholder:text-sm dark:bg-gray-900/70"
          />
        </div>
        <div>
          <label
            htmlFor="contactInfo"
            className="block font-medium text-gray-700 dark:text-gray-200"
          >
            Contact Info (Optional)
          </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            placeholder="Phone / Email / Social Media Link"
            className="mt-1 w-full rounded-lg border px-4 py-3 placeholder:text-sm dark:bg-gray-900/70"
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="title" className="block font-medium text-gray-700 dark:text-gray-200">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Title of the Notes / Book"
          className="mt-1 w-full rounded-lg border px-4 py-3 placeholder:text-sm dark:bg-gray-900/70"
        />
      </div>

      <div className="mt-6">
        <label htmlFor="link" className="block font-medium text-gray-700 dark:text-gray-200">
          PDF File Link{' '}
          <Link className="text-primary-500 underline" href={'#tutorial'}>
            (How to?)
          </Link>
        </label>
        <input
          type="url"
          id="link"
          name="link"
          required
          placeholder="Link of the PDF File"
          className="mt-1 w-full rounded-lg border px-4 py-3 placeholder:text-sm dark:bg-gray-900/70"
        />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="block font-medium text-gray-700 dark:text-gray-200">
          Message / Details (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Any Message or Details you'd like to share..."
          className="mt-1 min-h-24 w-full rounded-lg border px-4 py-3 placeholder:text-sm dark:bg-gray-900/70"
        />
      </div>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <div className="mt-6">
        <button
          disabled={status === 'loading'}
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary-600 p-3 text-white transition-all hover:scale-[.98] hover:bg-primary-800 disabled:opacity-85"
        >
          {renderButtonContent()}
        </button>
      </div>
    </form>
  )
}

export default UploadNotesForm
