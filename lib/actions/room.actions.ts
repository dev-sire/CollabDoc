'use server'

import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"
import { liveblocks } from "../liveblocks"
import { getAccessType, parseStringify } from "../utils"

export const createDocument = async ({userId, email}: CreateDocumentParams) => {
  const roomId = nanoid()

  try {
      const metadata = {
        creatorId: userId,
        email,
        title: 'Untitled'
      }
  
      const usersAccesses: RoomAccesses = {
        [email]: ['room:write']
      }
  
      const room = await liveblocks.createRoom(roomId, {
        metadata,
        usersAccesses,
        defaultAccesses: []
      });
      
      revalidatePath('/');
  
      return parseStringify(room);
  }catch(error) {
      console.log(`Error happened while creating a room: ${error}`);
  }
}
export const getDocument = async({ roomId, userId }: { roomId: string; userId: string}) => {
  try {
    const room = await liveblocks.getRoom(roomId)

    const hasAccess = Object.keys(room.usersAccesses).includes(userId)
  
    if(!hasAccess){
      throw new Error("You do not have access to this room")
    }
  
    return parseStringify(room)

  } catch (error) {
    console.log(error)
  }
}
export const updateTitle = async(roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title
      }
    })

    revalidatePath(`/documents/${roomId}`)

    return parseStringify(updatedRoom)
  } catch (error) {
    console.log(`Error happened while updating the document: ${error}`)
  }
}
export const getDocuments = async(email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email})
  
    return parseStringify(rooms)

  } catch (error) {
    console.log(`Error happened while getting rooms: ${error}`)
  }
}
export const updateDocumentAccess = async({ roomId, email, userType, updatedBy }: ShareDocumentParams) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    }

    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses
    })

    if(room){
      // Send a notification
    }
    revalidatePath(`/documents/${roomId}`)

    return parseStringify(room)
  } catch (error) {
    console.log(`Error happened while updating document: ${error}`)
  }
}
export const removeCollaborators = async({ roomId, email }: { roomId: string, email: string}) => {
  try {
    const room = await liveblocks.getRoom(roomId)

    if(room.metadata.email === email){
      throw new Error("You cannot remove yourself from the document")
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      }
    })
    revalidatePath(`/documents/${roomId}`)

    return parseStringify(updatedRoom)
  } catch (error) {
    console.log(`Error happened while removing a collaborator: ${error}`)
  }
}