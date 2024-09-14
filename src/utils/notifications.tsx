import React, {createContext, useContext, useState} from "react";
import uniqid from "uniqid";
import {NotificationEnum} from "../enums/notificationEnum";

type Notification = {
    id: string
    message: string;
    type: NotificationEnum
}
type NewNotification = Omit<Notification, 'id'>

interface INotificationContext {
    notifications: Array<Notification>
    addNotification: (notification: NewNotification) => void
    removeNotification: (id: string) => void
}

const NotificationContext = createContext<INotificationContext>({
    notifications: [],
    addNotification: () => {
    },
    removeNotification: () => {
    }
})

export const NotificationProvider = ({children}: { children: React.ReactElement }) => {
    const [notifications, setNotifications] = useState<Array<Notification>>([])
    const removeNotification = (id: string) => {
        setNotifications((value) => value.filter((item) => item.id !== id))
    }
    const addNotification = (notification: NewNotification) => {
        const newNotification = {...notification, id: uniqid()}
        setNotifications([...notifications, newNotification])
        setTimeout(() => removeNotification(newNotification.id), 10000)
    }
    return <NotificationContext.Provider value={{
        notifications,
        addNotification,
        removeNotification
    }}>
        {children}
    </NotificationContext.Provider>
}
export const useNotifications = () => useContext(NotificationContext);