import { Board } from '@/components/board/Board'
import { Navbar } from '@/components/nav/Navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <Board />
    </div>
  )
}