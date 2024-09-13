import {TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import React from "react";

interface IControlledTextFieldProps {
    name: string,
    label: string,
}

export default function ControlledTextField({name, label}: IControlledTextFieldProps) {
    const {control} = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({field})=>{
                return <TextField {...field} label={label} fullWidth/>
            }}/>
    )
}