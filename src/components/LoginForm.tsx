import React, {useEffect, useState} from "react";
import {Button, Dialog, Grid2, Paper, styled} from "@mui/material";
import {useTranslation} from "react-i18next";
import {FormProvider, useForm} from "react-hook-form";
import ControlledTextField from "./form-components/ControlledTextField";
import {useAuth} from "../providers/auth";

const FormContainer = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2, 2),
}))

interface ILoginForm {
    email: string
    password: string
}

export default function LoginForm() {
    const {t} = useTranslation();
    const {loginUser, createUser, user, isAuthenticated, logoutUser} = useAuth()
    const [open, setOpen] = useState(false);
    const methods = useForm<ILoginForm>({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const handleOpenLoginForm = () => setOpen(true)
    const handleCloseLoginForm = () => setOpen(false)
    const handleLoginUser = () => {
        const data = methods.getValues()
        loginUser(data)
    }
    const handleSignInUser = () => {
        const data = methods.getValues()
        createUser(data)
    }
    const handleLogout = () => {
        logoutUser()
    }
    useEffect(() => {
        setOpen(false)
    }, [isAuthenticated])
    if (isAuthenticated) {
        return <Button onClick={handleLogout}>{user?.email}</Button>
    }
    return (<>
        <Button onClick={handleOpenLoginForm}>{t('button.login')}</Button>
        <Dialog
            open={open}
            onClose={handleCloseLoginForm}
        >
            <FormContainer elevation={3}>
                <FormProvider {...methods}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <ControlledTextField
                                name={`email`}
                                label={t(`loginForm.emailLabel`)}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <ControlledTextField
                                name={`password`}
                                type="password"
                                label={t(`loginForm.passwordLabel`)}
                            />
                        </Grid2>
                        <Grid2 size={6} textAlign={"center"} onClick={handleLoginUser}>
                            <Button variant={"contained"}>{t('button.logIn')}</Button>
                        </Grid2>
                        <Grid2 size={6} textAlign={"center"} onClick={handleSignInUser}>
                            <Button variant={"outlined"}>{t('button.signIn')}</Button>
                        </Grid2>
                    </Grid2>
                </FormProvider>
            </FormContainer>
        </Dialog>
    </>)
}