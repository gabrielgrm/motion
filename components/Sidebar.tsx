'use client'
import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import {useCollection} from "react-firebase-hooks/firestore"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { collectionGroup, query, where, type DocumentData } from "firebase/firestore"
import { db } from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import SidebarOption from "./SidebarOption"

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor",
  roomId: string;
  userId: string;
}

function Sidebar() {
  const {user} = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  })
  const [data] = useCollection(
    user &&
      query(
        collectionGroup(db,"rooms"),
        where('userId', '==', user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if(!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }> (
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          })
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData
          })
        }
        return acc;
      }, {
        owner: [],
        editor: [],
      }
    )

    setGroupedData(grouped);

  }, [data])

  const menuOptions = (
    <>
      <div className="text-center">
        <NewDocumentButton/>
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm m-2 max-w-30">Nenhum documento encontrado</h2>
        ): (
          <>
            <h2 className="text-gray-500 font-semibold text-sm m-2">Meus Documentos</h2>
            {groupedData.owner.map((doc) => (
              <SidebarOption key={doc.roomId} id={doc.roomId} href={`/doc/${doc.roomId}`}/>
            ))}
          </>
        )}
      
      {groupedData.editor.length > 0 && (
        <>
          <h2 className="text-gray-500 font-semibold text-sm m-2">Compartilhado com Você</h2>
          {groupedData.editor.map((doc) => (
            <SidebarOption key={doc.roomId} id={doc.roomId} href={`/doc/${doc.id}`}  />
          ))}
        </>
      )}
      </div>
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative text-center">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 text-black hover:opacity-30 rounded-lg" size={40}
            />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-center">Menu</SheetTitle>
              <div>
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">
        {menuOptions}
      </div>
    </div>
  )
}
export default Sidebar