import './globals.css'
import { Press_Start_2P } from 'next/font/google'
import TerminalHeader from '@/components/TerminalHeader'
import UnderConstructionNotice from '@/components/UnderConstructionNotice'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Muzeffer's Blog</title>
        <meta name="description" content="Personal blog of Muzeffer" />
      </head>
      <body className={pressStart2P.className}>
        <UnderConstructionNotice />
        <TerminalHeader />
        {children}
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </body>
    </html>
  )
}
