import React from 'react'

const GoogleDrivePDF = ({ link }: { link: string }): JSX.Element => {
  return (
    <iframe
      title="notes-pdf"
      src={`${link}/preview`}
      allow="autoplay"
      style={{ width: '100%', height: '100%', aspectRatio: '9/11' }}
    ></iframe>
  )
}

export default GoogleDrivePDF
