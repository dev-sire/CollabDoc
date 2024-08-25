'use client'

import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import Image from "next/image"
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui"
import { ReactNode } from "react"

const Notifications = () => {

    const { inboxNotifications } = useInboxNotifications()
    const { count } = useUnreadInboxNotificationsCount()
    const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt)

  return (
    <Popover>
        <PopoverTrigger className="relative size-10 flex items-center justify-center rounded-lg">
            <Image src="/assets/icons/bell.svg" alt="inbox" width={24} height={24} />
            {count > 0 && <div className="absolute top-2 right-2 size-2 bg-blue-500 rounded-full z-20" />}
        </PopoverTrigger>
        <PopoverContent align="end" className="shad-popover">
            <LiveblocksUIConfig
                overrides={{
                    INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
                        <>{user} mentioned you.</>
                    )
                }}
            >
                <InboxNotificationList>
                    {unreadNotifications.length <=0 && (
                        <p className="py-2 text-center text-dark-500">No new notifications</p>
                    )}
                    {unreadNotifications.length > 0 && unreadNotifications.map((notification) => (
                        <InboxNotification
                            key={notification.id}
                            inboxNotification={notification}
                            className="bg-dark-200 text-white"
                            href={`/documents/${notification.roomId}`}
                            showActions={false}
                            kinds={{
                                thread: (props) => (
                                    <InboxNotification.Thread {...props}
                                        showActions={false}
                                        showRoomName={false}
                                    />
                                ),
                                textMention: (props) => (
                                    <InboxNotification.TextMention {...props}
                                        showRoomName={false}
                                    />
                                ),
                                $documentAccess: (props) => (
                                    <InboxNotification.Custom {...props} 
                                        title={props.inboxNotification.activities[0].data.title} 
                                        aside={
                                            <InboxNotification.Icon>
                                                <Image 
                                                    src={props.inboxNotification.activities[0].data.avatar as string || ''} 
                                                    width={24}
                                                    height={24}
                                                    alt="avatar"
                                                    className="rounded-full"
                                                />
                                            </InboxNotification.Icon>
                                        }>
                                        {props.children}
                                    </InboxNotification.Custom>
                                )
                            }}
                        />
                    ))}
                </InboxNotificationList>   
            </LiveblocksUIConfig>
        </PopoverContent>
    </Popover>
  )
}
export default Notifications