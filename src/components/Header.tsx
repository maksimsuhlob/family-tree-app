import {Grid2} from "@mui/material";
import React from "react";
import Menu from "./Menu";


export function Header() {

    return (
        <>
            <Grid2
                container
                spacing={1}
                justifyContent={'space-between'}
                padding={2}
            >
                <Grid2>FamilyTree</Grid2>
                <Grid2 container>
                    <Grid2>avatar</Grid2>
                    <Grid2>
                        <Menu/>
                    </Grid2>
                </Grid2>
            </Grid2>

        </>
    )
}