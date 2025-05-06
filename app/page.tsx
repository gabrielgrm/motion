'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SignInButton, SignedOut, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const [activated, setActivated] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useUser()

  // Se estiver logado, redireciona para /home
  useEffect(() => {
    if (isSignedIn) {
      router.push('/home')
    }
  }, [isSignedIn, router])

  // Ativação automática da animação após 3s
  useEffect(() => {
    const timer = setTimeout(() => setActivated(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      {/* Background com opacidade */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.png')",
          opacity: 0.10, // Ajuste a opacidade aqui
        }}
      ></div>

      {/* Conteúdo */}
      <div
        onMouseEnter={() => setActivated(true)}
        className="relative flex flex-col items-center transition-all duration-100"
      >
        {/* LOGO */}
        <Image
          src="/logo.png"
          alt="Logo"
          width={800}
          height={800}
          className={`transition-transform duration-500 ${
            activated ? '-translate-y-10' : ''
          }`}
        />
        <p
          className={`transition-transform duration-500 mt-7 text-gray-600 text-center ${
            activated ? '-translate-y-10' : ''
          }`}
        >
          Uma plataforma para colaboração em tempo real e organização eficiente de ideias.
        </p>
        <SignedOut>
          <SignInButton>
            <button
              className={`mt-4 bg-black text-white px-6 py-2 rounded-2xl transition-all duration-500 cursor-pointer
                hover:bg-white hover:text-black hover:border-2 hover:border-black 
              ${activated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </main>
  )
}