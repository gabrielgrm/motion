import { ArrowLeftCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <div className="absolute left-4 flex items-center space-x-2 -top-1">
        <ArrowLeftCircle className="w-12 h-12" />
        <h1>
          Comece criando um <strong>Novo Documento!</strong>
        </h1>
      </div>
    </main>
  )
}