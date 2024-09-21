import {Box, Divider, Drawer, drawerClasses, IconButton, styled} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {NavLink} from "react-router-dom";
import {routes} from "../router/router";
import {useTranslation} from "react-i18next";

const DrawerHeader = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const DrawerStyled = styled(Drawer)(() => ({
    width: 240,
    flexShrink: 0,
    [`& .${drawerClasses.paper}`]: {
        width: 240,
    },
}));
const NavLinkStyled = styled(NavLink)(({theme}) => {
    return {
        display: 'block',
        padding: theme.spacing(1, 1),
        color: theme.palette.primary.light,
        '&.active': {
            color: theme.palette.primary.dark,
        }
    }
});

export default function Menu() {
    const {t} = useTranslation()
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClickItem = () => {
        setOpen(false);
    };
    return (<>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={[open && {display: 'none'}]}
        >
            <MenuIcon/>
        </IconButton>
        <DrawerStyled
            open={open}
            anchor="right"
            variant="temporary"

        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon/>
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <Box padding={1}>
                <NavLinkStyled to={routes.home} onClick={handleClickItem}>{t('menu.home')}</NavLinkStyled>
                <NavLinkStyled to={routes.trees} onClick={handleClickItem}>{t('menu.tree')}</NavLinkStyled>
            </Box>
        </DrawerStyled>
    </>)
}