import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sleep Tracker',
  description: 'Satyam Chaudhary',
  generator: 'Next.js',
  icons: {
    icon: 'icon.png', 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
