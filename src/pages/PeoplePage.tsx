import React from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import {getPersonUrl} from "../router/router";

function PeoplePage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const handleAddNewPerson=()=>{
        navigate(getPersonUrl('new'));
    }
    return (
        <>
            <Box>
                PersonsPage
            </Box>
            <Box>
                <Button variant={'contained'} onClick={handleAddNewPerson}>{t("personsPage.addNewPerson")}</Button>
            </Box>
        </>
    );
}

export default PeoplePage;
