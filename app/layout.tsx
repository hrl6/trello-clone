import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { TrpcProvider } from '@/utils/trpc-provider'

const nunito = Nunito({ subsets: ['latin'] })

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
      <body className={nunito.className}>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  )
}