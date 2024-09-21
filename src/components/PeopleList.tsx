import {IIndividual} from "../interfaces/individual";
import {NavLink} from "react-router-dom";
import {getPersonUrl} from "../router/router";
import {getBirthFullName} from "../utils/personHelpers";
import {Box} from "@mui/material";
import PersonForm from "./PersonForm";
import {usePeople} from "../hooks/usePeople";
import {useEffect} from "react";
import {ITreeRecord} from "../hooks/useTree";

interface IProps {
    trees: ITreeRecord[]
    activeTree: string | null
}

export default function PeopleList({activeTree, trees}: IProps) {

    const {addNewIndividual, people, getPeopleList} = usePeople()
    const handleAddNewPerson = (data: IIndividual) => {
        if (activeTree) {
            const tree = trees.find(tree => tree.id === activeTree)
            addNewIndividual(activeTree, tree?.people || [], data)
        }
    }
    useEffect(() => {
        const peopleIds = trees.find(tree => tree.id === activeTree)?.people || []
        const unsubscribe = getPeopleList(peopleIds)
        return () => unsubscribe?.();
    }, [activeTree, trees, getPeopleList])
    return (
        <>
            <Box>
                <PersonForm onSubmit={handleAddNewPerson}/>
            </Box>
            {people?.map((person) => (<NavLink to={getPersonUrl(person.id)} key={person.id}>
                {getBirthFullName(person)}
            </NavLink>))}
        </>
    )
}