import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components/Header";
import {Box} from "@mui/material";

function HomePage() {
    return (
        <>
            <Header/>
            <Box padding={2}><Outlet/></Box>
        </>
    );
}

export default HomePage;
