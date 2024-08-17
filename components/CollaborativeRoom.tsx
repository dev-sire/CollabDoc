'use client'

import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import { Editor } from './editor/Editor'
import Header from './Header'
import ActiveCollaborators from './ActiveCollaborators'
import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { updateTitle } from '@/lib/actions/room.actions'
import Loader from './Loader'
import ShareModal from './ShareModal'

const CollaborativeRoom = ({ roomId, roomMetadata, users, currentUserType }: CollaborativeRoomProps) => {

    const[editing, setEditing] = useState(false)
    const[loading, setLoading] = useState(false)
    const[documentTitle, setDocumentTitle] = useState(roomMetadata.title)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const updateTitleHandler = async(e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setLoading(true)

            try {
                if(documentTitle !== roomMetadata.title){
                    const updatedDocument = await updateTitle(roomId, documentTitle) 
                    if(updatedDocument){
                        setEditing(false)
                    }
                }   
            } catch (error) {
                console.log(error)
            }

            setLoading(false)
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(containerRef.current && !containerRef.current.contains(e.target as Node)){
                setEditing(false)
                updateTitle(roomId, documentTitle)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [roomId, documentTitle])

    useEffect(() => {
        if(editing && inputRef.current){
            inputRef.current.focus()
        }
    }, [editing])

  return (
    <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loader />}>
            <div className="collaborative-room">
                <Header>
                    <div ref={containerRef} className="flex w-fit items-center justify-center gap-2">
                        {editing && !loading ? (
                            <Input 
                                type='text'
                                value={documentTitle}
                                placeholder='Enter Title'
                                ref={inputRef}
                                onChange={(e) => setDocumentTitle(e.target.value)}
                                onKeyDown={updateTitleHandler}
                                disabled={!editing}
                                className='document-title-input'

                            />
                        ): (
                            <>
                                <p className='document-title'>{documentTitle}</p>
                            </>
                        )}
                        {currentUserType === 'editor' && !editing && (
                            <Image 
                                src="/assets/icons/edit.svg"
                                alt='edit'
                                width={24}
                                height={24}
                                className='pointer'
                                onClick={() => setEditing(true)}
                            />
                        )}
                        {currentUserType !== 'editor' && !editing && (
                            <p className="view-only-tag">View only</p>
                        )}
                        {loading && <p className='text-sm text-gray-400'>Saving...</p>}
                    </div>
                    <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
                        <ActiveCollaborators />
                        <ShareModal 
                            roomId={roomId}
                            collaborators={users}
                            creatorId={roomMetadata.creatorId}
                            currentUserType={currentUserType}
                        />
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </Header>
                <Editor roomId={roomId} currentUserType={currentUserType} />
            </div>
        </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom