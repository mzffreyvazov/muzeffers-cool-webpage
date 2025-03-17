'use client'

import dynamic from 'next/dynamic'

const UnderConstructionNotice = dynamic(() => import('./UnderConstructionNotice'), {
  ssr: false
})

export default function ClientWrapper() {
  return <UnderConstructionNotice />
}
