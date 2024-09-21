import {Alert, Box, styled} from "@mui/material";
import {useNotifications} from "../providers/notifications";

const AlertContainer = styled(Box)(({theme}) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: theme.zIndex.snackbar + 1,
}))
export default function NotificationList() {
    const {notifications, removeNotification} = useNotifications();
    const handleClickClose = (id: string) => () => removeNotification(id)
    return <AlertContainer>
        {
            notifications.map((notification) => {
                return <Alert
                    key={notification.id}
                    severity={notification.type}
                    onClose={handleClickClose(notification.id)}
                >
                    {notification.message}
                </Alert>
            })
        }
    </AlertContainer>
}