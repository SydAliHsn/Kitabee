import React from 'react';
import readDirRecursive, { recursiveDir } from 'lib/readDirRecursive';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';

const renderDropdownsRecursive = (dirStructure: recursiveDir[]) => {

    return dirStructure.map(({ children, name, type }) => {
        const formattedName = name.replace(/-/g, ' ').replace(/.mdx/g, '')
            .split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        const link = allBlogs.find((blog) => blog.slug.split('/').pop() === name.replace('.mdx', ''))?.path || '/';

        return <li key={name} className='*:dark:bg-slate-800 *:hover:bg-slate-200 *:bg-slate-100 *:hover:scale-[1.02] *:transition-transform rounded-lg'>
            {type === 'folder' ?
                <details className="mb-2 rounded-lg">
                    <summary className="p-3 rounded-lg cursor-pointer">
                        <span className="font-semibold">{formattedName}</span>
                    </summary>
                    <ul className="*:shadow-sm ml-8">
                        {children && renderDropdownsRecursive(children)}
                        {!children?.length && <p className='p-3 mb-2'>Empty...</p>}
                    </ul>

                </details> :
                <Link href={link} className="block p-3 mb-2 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200">{formattedName}</p>
                </Link>
            }
        </li>
    }
    );
};

const page = (): JSX.Element => {
    const dirStructure: recursiveDir[] = readDirRecursive(process.cwd() + '/data/notes');

    return <section>
        <h1 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 text-center">
            Notes</h1>

        <div className="p-4 max-w-2xl mx-auto mt-12 text-gray-800 dark:text-gray-200 bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 rounded-lg">
            <ul className="*:shadow-sm">
                {renderDropdownsRecursive(dirStructure)}
            </ul>
        </div>


        <p className="mt-20 mx-auto leading-8 max-w-4xl text-xl text-gray-600 dark:text-gray-400 text-center">Please to contribute to the Notes collection by creating PDFs of the notes you  own and uploading <Link className='font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400' href={"/upload"}>here</Link>.</p>
    </section>
};

export default page;