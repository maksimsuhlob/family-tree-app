import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth";
import {firebaseApp} from "../utils/firebase";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useNotifications} from "./notifications";
import {useTranslation} from "react-i18next";
import {NotificationEnum} from "../enums/notificationEnum";
import {useUser} from "../hooks/useUser";

const auth = getAuth(firebaseApp);

type AuthCredentials = { email: string, password: string }

interface IAuthContext {
    loginUser: (credentials: AuthCredentials) => void
    createUser: (credentials: AuthCredentials) => void
    logoutUser: () => void
    user: User | null
    isAuthenticated: boolean
}

const AuthContext = createContext<IAuthContext>({
    loginUser: () => null,
    createUser: () => null,
    logoutUser: () => null,
    user: null,
    isAuthenticated: false,
})

export const AuthProvider = ({children}: { children: React.ReactElement }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const {addNotification} = useNotifications()
    const {t} = useTranslation()
    const {addNewUser} = useUser()

    const createUser = ({email, password}: { email: string, password: string }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredantial) => {
                addNewUser({uid: userCredantial.user.uid, email: userCredantial.user?.email})
            })
            .catch((error) => {
                const errorCode = error.code;
                addNotification({message: t(`error.${errorCode}`), type: NotificationEnum.error})
            });
    }
    const loginUser = ({email, password}: { email: string, password: string }) => {
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                const errorCode = error.code;
                addNotification({message: t(`error.${errorCode}`), type: NotificationEnum.error})
            });
    }
    const logoutUser = () => {
        signOut(auth)
            .catch((error) => {
                const errorCode = error.code;
                addNotification({message: t(`error.${errorCode}`), type: NotificationEnum.error})
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setIsAuthenticated(true)
            } else {
                setUser(null)
                setIsAuthenticated(false)
            }
        });
    }, [])

    return <AuthContext.Provider value={{
        loginUser,
        createUser,
        logoutUser,
        user,
        isAuthenticated
    }}>
        {children}
    </AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);