'use client'
import React, { useState, useTransition } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import useOwner from '@/lib/useOwner'
import { useRoom } from '@liveblocks/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collectionGroup, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { removeUserFromDocument } from '@/actions/actions'
import { useRouter } from "next/navigation";

export default function ManageUsers() {
  const { user } = useUser();
  const isOwner = useOwner();
  const room = useRoom();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const handleDelete = async (userId: string) => {
    startTransition(async () => {
      if (!user) return;

      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success("Usuário removido com sucesso!");

        const currentUserEmail = user.emailAddresses?.[0]?.toString();
        console.log("Usuário atual:", currentUserEmail);
        console.log("Usuário removido:", userId);

        if (userId === currentUserEmail) {
          router.replace("/");
        }
      } else {
        toast.error("Falha ao remover o usuário!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='cursor-pointer'>
          Usuários ({usersInRoom?.docs.length})
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuários com acesso</DialogTitle>
          <DialogDescription>
            Lista de usuários com permissão a esse documento.
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2" />

        <div className="flex flex-col space-y-2">
          {usersInRoom?.docs.map((doc) => (
            <div
              key={doc.data().userId}
              className="flex justify-between items-center"
            >
              <p className="font-light">
                {doc.data().userId === user?.emailAddresses[0].toString()
                  ? `Você (${doc.data().userId})`
                  : doc.data().userId}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline">{doc.data().role}</Button>
                {isOwner &&
                  doc.data().userId !== user?.emailAddresses[0].toString() && (
                    <Button
                      variant="outline"
                      className="text-red-700 border-l-sidebar-accent-foreground border-r-sidebar-accent-foreground"
                      disabled={isPending}
                      size="sm"
                      onClick={() => handleDelete(doc.data().userId)}
                    >
                      {isPending ? "Excluindo..." : "excluir"}
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}