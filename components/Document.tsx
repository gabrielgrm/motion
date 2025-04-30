'use client'

import { useEffect, useState, useTransition, type FormEvent } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"

function Document({id}: {id: string}) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id))
  const [input, setInput] = useState("")
  const [isUpdating, startTransition] = useTransition();
  // const isOwner = useOwner();

  useEffect(() => {
    if(data) {
      setInput(data.tittle)
    }
  }, [data])

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          tittle: input,
        })
      })
    }
  }
  return (
    <div>

      <div className="flex max-w-6xl mx-auto justify-between">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          {/* update title...*/}
          <Input
          className="border-black"
          type="text"
          placeholder="Título"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={isUpdating}>
            {isUpdating ? "Atualizando..." : "Atualizar"}
          </Button>
          {/* IF */}
        </form>
      </div>

      <div>
        {/* ManageUsers */}

        {/* Avatars */}
      </div>

      {/* Collaborative Editor */}
    </div>
  )
}
export default Document