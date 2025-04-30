'use client'

import {
  ClientSideSuspense,
  RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react/suspense"

import { LiveList, LiveObject } from "@liveblocks/client";
import LoadingSpinner from "./LoadingSpinner";
import LiveCursorProvider from "./LiveCursorProvider";

function RoomProvider({roomId, children}: {
  roomId: string;
  children: React.ReactNode;
}) {
  return (
    <RoomProviderWrapper
      id={roomId}
      initialPresence={{
        cursor: null
      }}
      initialStorage={{
        peaple: new LiveList([new LiveObject({name: "Marie", age: 30})])
      }}
    >
      <ClientSideSuspense fallback={<LoadingSpinner/>}>
        <LiveCursorProvider>
        {children}
        </LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}
export default RoomProvider