'use client'
import React, { useState, useTransition, type FormEvent } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { deleteDocument, inviteUserToDocument } from '@/actions/actions'
import { toast } from 'sonner'
import { Input } from './ui/input'

export default function InviteUser() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();

    const roomId = pathname.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      const {success} = await inviteUserToDocument(roomId, email);

      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("Usuário convidado com sucesso!")
      } else {
        toast.error("Falha ao convidar o usuário!")
      }
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='border-black'>
          Convidar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convide um usuário para colaborar!</DialogTitle>
          <DialogDescription>
            Coloque o email do usuário que você deseja convidar para colaborar nesse documento.
          </DialogDescription>
        </DialogHeader>

        <form className='flex gap-2' onSubmit={handleInvite}>
          <Input
          type='email'
          placeholder='Email do usuário'
          className = 'w-full'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit' disabled={!email || isPending}>{isPending? "Convidando..." : "Convidar"}</Button> {/* Add onClick handler for invite */}
        </form>
      </DialogContent>
    </Dialog>
  )
}