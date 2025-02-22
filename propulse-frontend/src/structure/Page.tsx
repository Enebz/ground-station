import React from 'react'


// Page Interface
interface PageProps {
  children?: React.ReactNode
}

// Page Function: The base structure for each page.
const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className='flex flex-col h-content p-4'>
      {children}
    </div>
  )
}

export default Page