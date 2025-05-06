import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

interface DocLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function DocLayout({
  children,
  params,
}: DocLayoutProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  await auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}