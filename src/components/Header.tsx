import {Grid2} from "@mui/material";
import React from "react";
import Menu from "./Menu";
import LoginForm from "./LoginForm";
import NotificationList from "./NotificationList";


export function Header() {
    return (
        <>
            <NotificationList/>
            <Grid2
                container
                spacing={1}
                justifyContent={'space-between'}
                padding={2}
            >
                <Grid2>FamilyTree</Grid2>
                <Grid2 container>
                    <Grid2><LoginForm/></Grid2>
                    <Grid2>
                        <Menu/>
                    </Grid2>
                </Grid2>
            </Grid2>

        </>
    )
}