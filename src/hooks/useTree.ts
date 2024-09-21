import {useNotifications} from "../providers/notifications";
import {useTranslation} from "react-i18next";
import {NotificationEnum} from "../enums/notificationEnum";
import {
    addDoc,
    collection,
    doc,
    FirestoreError,
    getFirestore,
    onSnapshot,
    or,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import {collections, converter, firebaseApp} from "../utils/firebase";
import {useState} from "react";
import {useUser} from "./useUser";

export interface ITreeBase {
    name: string;
}

export interface ITree extends ITreeBase {
    owner: string;
    editors?: Array<string>;
    people?: Array<string>;
    families?: Array<string>;
}

export interface ITreeRecord extends ITree {
    id: string
}


const db = getFirestore(firebaseApp)

export const useTree = () => {
    const [trees, setTrees] = useState<ITreeRecord[]>([]);
    const {user} = useUser()
    const {addNotification} = useNotifications()
    const {t} = useTranslation()

    const addNewTree = async (newTreeData: ITree): Promise<{ id: string } | null> => {
        if (!user) {
            addNotification({message: t('warning.notAuthorised'), type: NotificationEnum.warning})
            return null
        }
        try {
            const data = await addDoc(collection(db, collections.trees).withConverter(converter<ITree>()), newTreeData)
            addNotification({
                message: t('success.addNewRecord'),
                type: NotificationEnum.success,
            })
            return data?.id ? {id: data.id} : null
        } catch (e) {
            const {code} = e as FirestoreError
            addNotification({
                message: t(`error.${code}`),
                type: NotificationEnum.error,
            })
        }
        return null
    }
    const updateTree = async (treeId: string, data: Partial<ITree>) => {
        if (!user) {
            addNotification({message: t('warning.notAuthorised'), type: NotificationEnum.warning})
            return null
        }
        try {
            await updateDoc(doc(db, collections.trees, treeId).withConverter(converter<ITree>()), data)

        } catch (e) {
            const {code} = e as FirestoreError
            addNotification({
                message: t(`error.${code}`),
                type: NotificationEnum.error,
            })
        }
    }
    const getTreeList = () => {
        if (!user) {
            return null
        }
        const treeQuery = query(
            collection(db, collections.trees),
            or(
                where('owner', '==', user.uid),
                where('editors', 'array-contains', user.email)
            )
        ).withConverter(converter<ITree>())
        return onSnapshot(
            treeQuery,
            data => {
                const loadedTrees = data.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setTrees(loadedTrees)
            }
        )
    }


    return {
        addNewTree,
        updateTree,
        getTreeList,
        trees
    }
}