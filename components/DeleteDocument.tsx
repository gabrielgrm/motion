'use client'
import React, { useState, useTransition } from 'react'
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
import { deleteDocument } from '@/actions/actions'
import { toast } from 'sonner'

export default function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const handleDelete = async () => {
    const roomId = pathname.split("/").pop();
    if (!roomId) return;

    startTransition(async () => {
      const {success} = await deleteDocument(roomId);

      if (success) {
        setIsOpen(false);
        router.replace("/");
        toast.success("Sala deletada com sucesso!")
      } else {
        toast.error("Falha ao deletar a sala!")
      }
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 rounded">
          Deletar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Isso vai apagar <strong>permanentemente esse documento!</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-end gap-2'>
        <Button
          type='button'
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
            {isPending ? "Deletando...": "Deletar"}
        </Button>
        <DialogClose asChild>
          <Button type='button' variant={'secondary'}>
            Fechar
          </Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
