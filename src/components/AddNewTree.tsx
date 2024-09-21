import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {ITreeBase} from "../hooks/useTree";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import ControlledTextField from "./form-components/ControlledTextField";
import Transition from "./Transition";

interface IAddNewTreeProps {
    onSubmit: (newTree: ITreeBase) => void;
}

export default function AddNewTree({onSubmit}: IAddNewTreeProps) {
    const {t} = useTranslation();
    const [open, setOpen] = React.useState(false);
    const methods = useForm<ITreeBase>({
        defaultValues: {
            name: '',
        }
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        methods.handleSubmit(submitForm)()
        methods.reset()
        setOpen(false);
    };
    const submitForm: SubmitHandler<ITreeBase> = (data) => {
        onSubmit({name: data.name.trim()})
    }
    return (<>
        <Button onClick={handleClickOpen}> {t('button.newTree')}</Button>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{t('treesPage.newTreeForm')}</DialogTitle>
            <DialogContent>
                <Box paddingTop={1}>
                    <FormProvider {...methods}>
                        <ControlledTextField name={'name'} label={t('treesPage.nameField')}/>
                    </FormProvider>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('button.cancel')}</Button>
                <Button variant={"contained"} onClick={handleSave}>{t('button.save')}</Button>
            </DialogActions>
        </Dialog>
    </>)
}