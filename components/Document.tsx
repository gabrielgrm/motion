'use client'

import { useEffect, useState, useTransition, type FormEvent } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"
import Editor from "./Editor"
import useOwner from "@/lib/useOwner"
import DeleteDocument from "./DeleteDocument"
import InviteUser from "./InviteUser"
import ManageUsers from "./ManageUsers"
import Avatars from "./Avatars"

function Document({id}: {id: string}) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id))
  const [input, setInput] = useState("")
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

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
          {isOwner && (
            <>
            {/* Invite  */}
            <InviteUser/>
            <DeleteDocument/>
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between mb-5 mt-5 items-center">
        <ManageUsers/>

        <Avatars/>
      </div>


      <hr className="pb-10"/>

      {/* Collaborative Editor */}

      <Editor />
    </div>
  )
}
export default Document