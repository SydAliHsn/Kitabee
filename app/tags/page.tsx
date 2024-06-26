import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Tags of the available notes.',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <div className="mt-10 flex flex-row items-center justify-center divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:space-x-6 md:divide-y-0">
        {/* <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div> */}
        <div className="flex max-w-3xl flex-wrap justify-center">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2">
                <Tag text={t} />
                <Link
                  href={`/tags/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tagCounts[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
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
    </>
  )
}
