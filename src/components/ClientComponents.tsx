'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import TerminalHeader from './TerminalHeader'

const UnderConstructionNotice = dynamic(() => import('./UnderConstructionNotice'), {
  ssr: false,
  loading: () => null
})

export default function ClientComponents() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <TerminalHeader />
      </div>
      <div className="mt-[48px]"> {/* Adjust this value based on your header height */}
        <UnderConstructionNotice />
      </div>
    </>
  )
}
