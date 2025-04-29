'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '@/firebase'
import clsx from 'clsx'
interface SidebarOptionProps {
  href: string
  id: string
}

export default function SidebarOption({ href, id }: SidebarOptionProps) {
  const [data, loading, error] = useDocumentData(doc(db, 'documents', id))
  const pathname = usePathname()
  const isActive = href.includes(pathname!) && pathname !== '/'

  if (loading || error || !data) return null

  return (
    <Link
      href={href}
      className={clsx(
        'block text-left border-2 p-1.5 mb-1.5 rounded-md truncate hover:bg-gray-300',
        isActive
          ? 'bg-gray-300 font-bold border-black text-black'
          : 'border-gray-400 text-black'
      )}
    >
      <p className="truncate">{data.tittle /* ou data.tittle, conforme seu schema */}</p>
    </Link>
  )
}