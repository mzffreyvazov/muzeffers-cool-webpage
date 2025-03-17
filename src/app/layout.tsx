import './globals.css'
import { Press_Start_2P } from 'next/font/google'
import ClientComponents from '@/components/ClientComponents'

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={pressStart2P.className}>
        <ClientComponents />
        <main className="pt-[48px]"> {/* Adjust this value to match header height */}
          {children}
        </main>
        <script src="https://sdk.scdn.co/spotify-player.js" defer />
      </body>
    </html>
  )
}
