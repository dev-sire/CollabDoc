'use client'

import Loader from "@/components/Loader"
import { getClerkUsers } from "@/lib/actions/user.actions"
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react/suspense"
import { ReactNode } from "react"

// publicApiKey={"pk_dev_KOKqj…1dVeim"}

const Provider = ({children}: {children: ReactNode}) => {
  return (
    <LiveblocksProvider
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({userIds})
        return users
      }}
      authEndpoint="/api/liveblocks-auth"
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider