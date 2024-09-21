import {useNotifications} from "../providers/notifications";
import {useTranslation} from "react-i18next";
import {NotificationEnum} from "../enums/notificationEnum";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {collections, converter, firebaseApp} from "../utils/firebase";
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "../providers/auth";

interface IUser {
    uid: string;
    email: string | null;
}


const db = getFirestore(firebaseApp);

export const useUser = () => {
    const {addNotification} = useNotifications()
    const {t} = useTranslation()
    const [user, setUser] = useState<IUser | null>(null);
    const {user: authUser} = useAuth()

    const addNewUser = ({uid, email}: IUser) => {
        setDoc(doc(db, collections.users, uid), {uid, email})
            .then(() => {
                getUser(uid)
                addNotification({
                    message: t('success.addNewRecord'),
                    type: NotificationEnum.success,
                })
            })
            .catch(({code}) => {
                addNotification({
                    message: t(`error.${code}`),
                    type: NotificationEnum.error,
                })
            })
    }
    const getUser = useCallback((uid: string) => {
        getDoc(doc(db, 'users', uid).withConverter(converter<IUser>()))
            .then((data) => {
                setUser(data.data() || null)
            })
            .catch(({code}) => {
                addNotification({
                    message: t(`error.${code}`),
                    type: NotificationEnum.error,
                })
            })
    }, [addNotification, t])

    useEffect(() => {
        if (authUser) {
            getUser(authUser.uid)
        }
    }, [authUser, getUser])

    return {
        addNewUser,
        user
    }
}