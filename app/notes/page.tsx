import React from 'react'
import readDirRecursive, { recursiveDir } from 'lib/readDirRecursive'
import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'

const renderDropdownsRecursive = (dirStructure: recursiveDir[]) => {
  return dirStructure.map(({ children, name, type }) => {
    const formattedName = name
      .replace(/-/g, ' ')
      .replace(/.mdx/g, '')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    const link =
      allBlogs.find((blog) => blog.slug.split('/').pop() === name.replace('.mdx', ''))?.path || '/'

    return (
      <li
        key={name}
        className="rounded-lg *:bg-slate-100 *:transition-all *:hover:scale-[1.02] *:hover:bg-slate-200 *:dark:bg-slate-800 *:dark:hover:bg-slate-900"
      >
        {type === 'folder' ? (
          <details className="mb-2 rounded-lg">
            <summary className="cursor-pointer rounded-lg p-2 sm:p-3">
              <span className="font-semibold">{formattedName}</span>
            </summary>
            <ul className="ml-8 *:shadow-sm">
              {children && renderDropdownsRecursive(children)}
              {!children?.length && <p className="mb-2 p-2 sm:p-3">Empty...</p>}
            </ul>
          </details>
        ) : (
          <Link href={link} className="mb-2 block rounded-lg p-2 sm:p-3">
            <p className="text-gray-800 dark:text-gray-200">{formattedName}</p>
          </Link>
        )}
      </li>
    )
  })
}

const page = (): JSX.Element => {
  const dirStructure: recursiveDir[] = readDirRecursive(process.cwd() + '/data/notes')

  return (
    <section>
      <h1 className="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Notes
      </h1>

      <div className="mx-auto mt-12 max-w-2xl rounded-lg bg-gray-50 p-3 pt-5 text-gray-800 shadow-md dark:bg-gray-900/70 dark:text-gray-200 dark:shadow-gray-800/40 sm:p-4">
        <ul className="*:shadow-sm">{renderDropdownsRecursive(dirStructure)}</ul>
      </div>

      <p className="mx-auto mt-20 max-w-4xl text-center text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl">
        Please to contribute to the Notes collection by creating PDFs of the notes you own and
        uploading{' '}
        <Link
          className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          href={'/upload'}
        >
          here
        </Link>
        .
      </p>
    </section>
  )
}

export default page
