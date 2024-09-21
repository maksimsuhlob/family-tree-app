import React from 'react';
import {AppBar, Box, Button, Card, Dialog, Divider, Grid2, IconButton, styled, Toolbar} from "@mui/material";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {IIndividual} from "../interfaces/individual";
import {useTranslation} from "react-i18next";
import {GenderEnum, getGenderOptions} from "../enums/genderEnum";
import {getNameTypeOptions, NameEnum} from "../enums/nameEnum";
import ControlledAutocomplete from "./form-components/ControlledAutocomplete";
import ControlledTextField from "./form-components/ControlledTextField";
import Transition from "./Transition";
import CloseIcon from '@mui/icons-material/Close';

const NameCard = styled(Card)(({theme}) => ({
    padding: theme.spacing(2, 2),
    margin: theme.spacing(2, 0),
}))


const defaultName = {
    type: NameEnum.birth,
    name: {
        prefix: "",
        given: "",
        nickname: "",
        surnamePrefix: "",
        surname: "",
        suffix: "",
        notes: []
    },
    romanised: {
        prefix: "",
        given: "",
        nickname: "",
        surnamePrefix: "",
        surname: "",
        suffix: "",
        notes: []
    }
}

interface IProps {
    onSubmit: (data: IIndividual) => void;
}

function PersonForm({onSubmit,}: IProps) {
    const {t} = useTranslation();
    const [open, setOpen] = React.useState(false);
    const methods = useForm<IIndividual>({
        defaultValues: {
            names: [defaultName],
            sex: GenderEnum.unknown,
        }
    })
    const {fields: names, append, remove} = useFieldArray({
        name: "names",
        control: methods.control,
        rules: {minLength: 1}
    })

    const handleAddName = () => {
        append(defaultName)
    }
    const handleDeleteName = (index: number) => () => {
        remove(index)
    }
    const submitForm: SubmitHandler<IIndividual> = (data) => {
        onSubmit(data)
    }
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
    }
    return (
        <>
            <Button onClick={handleClickOpen} aria-hidden={'false'}>{t('button.addIndividual')}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
                TransitionComponent={Transition}
                closeAfterTransition={false}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon
                            />
                        </IconButton>
                        <Box flexGrow={1}/>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            {t('button.save')}
                        </Button>
                    </Toolbar>
                </AppBar>
                <FormProvider {...methods}>
                    {
                        names.map((field, i) => {
                            return <NameCard variant="outlined" key={field.id}>
                                <Grid2 container spacing={3} display={"flex"} flexWrap={"wrap"}>
                                    <Grid2 size={10}>
                                        <ControlledAutocomplete
                                            name={`names.${i}.type`}
                                            label={t('personPage.nameTypeLabel')}
                                            options={getNameTypeOptions(t)}
                                        />
                                    </Grid2>
                                    <Grid2
                                        display={"flex"}
                                        justifyContent={'center'}
                                        size={2}
                                    >
                                        <Button onClick={handleDeleteName(i)}>
                                            {t('button.delete')}
                                        </Button>
                                    </Grid2>
                                    {
                                        ['prefix', 'given', 'nickname', 'surnamePrefix', 'surname', 'suffix']
                                            .map((field, idx) => (
                                                <Grid2 key={field + idx} size={4} spacing={1} container>
                                                    <Grid2 size={6}>
                                                        <ControlledTextField
                                                            name={`names.${i}.name.${field}`}
                                                            label={t(`personPage.${field}NameLabel`)}
                                                        />
                                                    </Grid2>
                                                    <Grid2 size={6}>
                                                        <ControlledTextField
                                                            name={`names.${i}.romanised.${field}`}
                                                            label={t(`personPage.${field}NameRomanisedLabel`)}
                                                        />
                                                    </Grid2>
                                                </Grid2>
                                            ))}
                                </Grid2>
                            </NameCard>
                        })
                    }
                    <Button
                        variant={"contained"}
                        onClick={handleAddName}
                    >
                        {t('personPage.addName')}
                    </Button>
                    <Divider sx={{margin: '1rem'}}/>
                    <ControlledAutocomplete
                        name={'sex'}
                        label={t('personPage.sexLabel')}
                        options={getGenderOptions(t)}
                    />
                </FormProvider>
            </Dialog>
        </>
    );
}

export default PersonForm;
