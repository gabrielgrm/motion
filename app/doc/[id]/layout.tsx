// app/doc/[id]/layout.tsx
import RoomProvider from "@/components/RoomProvider"
import { auth } from "@clerk/nextjs/server"    // ← note the “/server”

export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const { id } = await params
  await auth.protect()

  return <RoomProvider roomId={id}>{children}</RoomProvider>
}