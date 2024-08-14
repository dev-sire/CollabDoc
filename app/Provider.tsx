'use client'

import Loader from "@/components/Loader"
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions"
import { useUser } from "@clerk/nextjs"
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense"
import { ReactNode } from "react"

// publicApiKey={"pk_dev_KOKqj…1dVeim"}

const Provider = ({children}: {children: ReactNode}) => {
  const { user: clerkUser } = useUser()

  return (
    <LiveblocksProvider
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({userIds})
        return users
      }}
      authEndpoint="/api/liveblocks-auth"
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text
        })

        return roomUsers
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider