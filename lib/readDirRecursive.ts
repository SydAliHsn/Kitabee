import fs from 'fs'
import path from 'path'

// Helper function to recursively read directories
const readDirRecursive = (dirPath: string): recursiveDir[] => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  return entries
    .map((entry) => {
      const fullPath = path.join(dirPath, entry.name)

      if (entry.isDirectory()) {
        return {
          name: entry.name,
          type: 'folder',
          children: readDirRecursive(fullPath),
        }
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        return {
          name: entry.name,
          type: 'file',
        }
      }
    })
    .filter(Boolean) as recursiveDir[] // Filter out any undefined entries
}

export type recursiveDir = {
  name: string
  type: string
  children?: recursiveDir[]
}

export default readDirRecursive
