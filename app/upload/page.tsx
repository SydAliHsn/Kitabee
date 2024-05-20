import React from 'react'
import UploadNotesForm from '@/components/UploadNotesForm'
import RecaptchaWrapper from '@/components/RecaptchaWrapper'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Upload Notes',
  description:
    'Share your notes with thousands of students in need. Upload your notes here and help other students in their studies.',
})

const upload = (): JSX.Element => {
  return (
    <RecaptchaWrapper>
      <section className="space-y-24">
        <div className="mt-12">
          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Upload Your Notes
          </h1>

          <p className="mx-auto mt-4 max-w-4xl text-center text-lg leading-8 text-gray-600 dark:text-gray-300 xl:text-xl">
            Thank You for coming here and choosing to help other students by uploading your notes.
            You are the best! We hope your notes will help thousands of students in need.
          </p>

          <UploadNotesForm />
        </div>

        <div id="tutorial">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            How to Upload Notes?
          </h2>
          <ol className="list-decimal">
            <li className="mx-auto mt-4 max-w-4xl leading-8 text-gray-600 dark:text-gray-300 xl:text-lg">
              Create a PDF file of your notes by taking photos of each page of the book and using an
              app like CamScanner to enhance the images and convert them into a PDF file.
            </li>
            <li className="mx-auto mt-3 max-w-4xl leading-8 text-gray-600 dark:text-gray-300 xl:text-lg">
              After the PDF is created, save it on your phone / PC and upload it to Google Drive.
            </li>
            <li className="mx-auto mt-3 max-w-4xl leading-8 text-gray-600 dark:text-gray-300 xl:text-lg">
              Share the link of the file from Google Drive and allow the access to anyone with the
              link. Then come here and share that link here.
            </li>
          </ol>
        </div>
      </section>
    </RecaptchaWrapper>
  )
}

export default upload
