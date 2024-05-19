import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import Link from 'next/link'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <>
    <section>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="pb-6 text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 text-center">
          Exclusive Notes PDFs for Free!</h1>
        <p className="mt-2 leading-8 max-w-4xl text-center sm:text-left text-lg xl:text-xl text-gray-600 dark:text-gray-400">Kitabee is a community initiative to give students access to School & College Notes from popular publishers without purchasing them. Students are requested to contribute to the Notes collection by creating PDFs of the notes they own and uploading <Link className='font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400' href={"/upload"}>here</Link>. Enjoy and Study well!</p>

        <div className="mt-10 flex gap-10">
          <Link href="/upload" className="px-4 py-3 text-lg font-bold text-white bg-primary-500 border border-transparent rounded-md shadow-sm hover:bg-primary-600 dark:hover:bg-primary-400">
            Upload Notes
          </Link>
          <Link href="/notes" className="px-4 py-3 text-lg font-bold text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 dark:hover:bg-blue-400">
            Start Studying
          </Link>
        </div>
      </div>
    </section>

    {/* <Main posts={posts} /> */}
  </>
}
