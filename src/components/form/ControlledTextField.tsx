import {TextField, TextFieldProps} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import React from "react";

interface IControlledTextFieldProps extends TextFieldProps<'standard'> {
    name: string,
}

export default function ControlledTextField({name, ...props}: IControlledTextFieldProps) {
    const {control} = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({field})=>{
                return <TextField
                    fullWidth
                    {...props}
                    {...field}
                />
            }}/>
    )
}