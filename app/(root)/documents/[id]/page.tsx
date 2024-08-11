import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser()
  if(!clerkUser) redirect('/sign-in')

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress
  })

  if(!room) redirect('/')

  // TODO: Access the room permissions of each individual user

  return (
    <main className='flex flex-col items-center w-full'>
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
      />
    </main>
  )
}

export default Document