'use client'

import { useTransition } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTrasition] = useTransition();
  const router = useRouter();
  const handleCreateNewDocument = () => {
    startTrasition(async () => {
    
      const {docId} = await createNewDocument();
      router.push(`/doc/${docId}`)
    })
  }

  return (
    <Button className="cursor-pointer" onClick={handleCreateNewDocument} disabled={isPending}> {isPending? "Criando..." : "Novo Documento"}</Button>
  )
}
export default NewDocumentButton