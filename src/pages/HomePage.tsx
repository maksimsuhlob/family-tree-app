import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components/Header";
import {Box} from "@mui/material";

function HomePage() {

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header/>
            <Box padding={2} flex={1}><Outlet/></Box>
        </Box>
    );
}

export default HomePage;
