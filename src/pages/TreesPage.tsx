import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Box, Button, Grid2, Typography} from "@mui/material";
import {ITreeBase, useTree} from "../hooks/useTree";
import {useUser} from "../hooks/useUser";
import AddNewTree from "../components/AddNewTree";
import TabsList from "../components/TabsList";
import PeopleList from "../components/PeopleList";
import {useNavigate} from "react-router-dom";
import {getTreeUrl} from "../router/router";


function TreesPage() {
    const {t} = useTranslation()
    const {addNewTree, getTreeList, trees} = useTree()
    const {user} = useUser()
    const [activeTree, setActiveTree] = useState<string | null>(null)
    const navigate = useNavigate();

    const handleAddTree = (newTree: ITreeBase) => {
        if (user) {
            addNewTree({...newTree, owner: user.uid})
                .then((data) => {
                    if (data?.id) {
                        setActiveTree(data.id)
                    }
                })
        }
    }
    const handleSelectTree = (treeId: string) => () => {
        setActiveTree(treeId)
        navigate(getTreeUrl(treeId))
    }

    useEffect(() => {
        const unsubscribe = getTreeList()
        return () => unsubscribe?.();
    }, [user, getTreeList])


    const myTrees = trees.filter(tree => {
        if (user) {
            return tree.owner === user.uid
        }
        return false
    }) || []

    const canEditTrees = trees.filter(tree => {
        if (user && tree.editors) {
            return (user.email && tree.editors.includes(user.email))
        }
        return false
    }) || []

    const tabs = [
        {
            children: <PeopleList activeTree={activeTree} trees={trees}/>,
            label: t('treesPage.people')
        },
        {
            children: 'families',
            label: t('treesPage.families')
        },
        {
            children: 'settings',
            label: t('treesPage.settings')
        },
    ]
    return (
        <Grid2 container>
            <Grid2 container size={4}>
                <Grid2 size={12}>
                    <AddNewTree onSubmit={handleAddTree}/>
                </Grid2>
                <Grid2 size={12}>
                    <Typography>{t("treesPage.myTrees")}</Typography>
                </Grid2>
                <Grid2 size={12}>
                    {myTrees.map((tree) => {
                        return (<Box key={tree.id}>
                            <Button
                                fullWidth
                                variant={tree.id === activeTree ? 'contained' : undefined}
                                onClick={handleSelectTree(tree.id)}
                            >
                                {tree.name || tree.id}
                            </Button>
                        </Box>)
                    })}
                </Grid2>
                <Grid2 size={12}>
                    <Typography>{t("treesPage.canEditTrees")}</Typography>
                </Grid2>
                <Grid2 size={12}>
                    {canEditTrees.map((tree) => {
                        return (<Box key={tree.id}>
                            <Button
                                fullWidth
                                onClick={handleSelectTree(tree.id)}
                            >
                                {tree.name || tree.id}
                            </Button>
                        </Box>)
                    })}
                </Grid2>
            </Grid2>
            <Grid2 container size={8}>
                {Boolean(activeTree) && <TabsList tabs={tabs}/>}
            </Grid2>
        </Grid2>
    );
}

export default TreesPage;
