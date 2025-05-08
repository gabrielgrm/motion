import { ArrowLeftCircle } from 'lucide-react'

export default function Home() {
  return (
    <main className="relative bg-white">
      <div className="absolute flex items-center space-x-2 top-3">
        <ArrowLeftCircle className="w-12 h-12" />
        <h1>
          Comece criando um <strong>Novo Documento!</strong>
        </h1>
      </div>
    </main>
  )
}