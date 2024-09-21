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
import {IIndividual, IIndividualRecord} from "../interfaces/individual";
import {useTree} from "./useTree";


const db = getFirestore(firebaseApp)

export const usePeople = () => {
    const [people, setPeople] = useState<IIndividualRecord[]>([]);
    const {user} = useUser()
    const {updateTree} = useTree()
    const {addNotification} = useNotifications()
    const {t} = useTranslation()

    const addNewIndividual = async (
        treeId: string,
        treePeopleList: Array<string>,
        newIndividualData: IIndividual
    ): Promise<{ id: string } | null> => {
        if (!user) {
            addNotification({message: t('warning.notAuthorised'), type: NotificationEnum.warning})
            return null
        }
        try {
            const data = await addDoc(
                collection(db, collections.people).withConverter(converter<IIndividual>()),
                newIndividualData
            )

            if (data.id) {
                await updateDoc(
                    doc(db, collections.people, data.id).withConverter(converter<IIndividualRecord>()),
                    {id: data.id}
                )
                await updateTree(treeId, {people: [...treePeopleList, data.id]})
                addNotification({
                    message: t('success.addNewRecord'),
                    type: NotificationEnum.success,
                })
            }

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
    const getPeopleList = (treePeopleList: Array<string>) => {
        if (!user || treePeopleList.length === 0) {
            return null
        }
        const treeQuery = query(
            collection(db, collections.people),
            or(
                where('id', 'in', treePeopleList)
            )
        ).withConverter(converter<IIndividualRecord>())
        return onSnapshot(
            treeQuery,
            data => {
                const loadedPeople = data.docs.map((doc) => doc.data())
                setPeople(loadedPeople)
            }
        )
    }

    return {
        addNewIndividual,
        getPeopleList,
        people
    }
}