import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
import './globals.css'
import { TrpcProvider } from '@/utils/trpc-provider'

const inter = Geologica({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'Ermm.. An advance todo list? ㋡',
  icons: {
    icon: '/tc.ico', // Basic favicon
    // You can also specify different sizes
    apple: '/tc.ico', // For Apple devices
    shortcut: '/tc.ico', // Shortcut icon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  )
}