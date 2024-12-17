import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TrpcProvider } from '@/utils/trpc-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'Ermm.. An advance todo list? ㋡',
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