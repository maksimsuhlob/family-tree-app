import React from 'react';
import {useParams} from "react-router-dom";
import {Box, Button, Card, Divider, Grid2, styled} from "@mui/material";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {IIndividualRecord} from "../interfaces/individual";
import {useTranslation} from "react-i18next";
import {GenderEnum, getGenderOptions} from "../enums/genderEnum";
import {getNameTypeOptions, NameEnum} from "../enums/nameEnum";
import ControlledAutocomplete from "../components/form/ControlledAutocomplete";
import ControlledTextField from "../components/form/ControlledTextField";

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


function PersonPage() {
    const {personId} = useParams()
    const {t} = useTranslation();
    const methods = useForm<IIndividualRecord>({
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
    const submitForm: SubmitHandler<IIndividualRecord> = (data) => {
        console.log('submitform', data)
    }

    return (
        <>
            <Box>
                PersonPage: {personId}
            </Box>
            <Box>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(submitForm)}>
                        {
                            names.map((field, i) => {
                                return <NameCard variant="outlined" key={field.id}>
                                    <Grid2 container spacing={2}>
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
                                                .map(field => (<>
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
                                                    </>
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
                        <Divider sx={{margin: '1rem'}} />
                        <ControlledAutocomplete
                            name={'sex'}
                            label={t('personPage.sexLabel')}
                            options={getGenderOptions(t)}
                        />
                        <Button type={'submit'}>{t('button.save')}</Button>
                    </form>
                </FormProvider>
            </Box>

        </>
    );
}

export default PersonPage;
