import {Autocomplete, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import React from "react";

interface IControlledAutocompleteProps {
    name: string,
    label: string,
    options: Array<{ value: any, label: string }>
}

export default function ControlledAutocomplete({name, options, label}: IControlledAutocompleteProps) {
    const {control} = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {value, onChange, ...field}}) => {
                const selectedOption = options.find(item => item.value === value)
                return <Autocomplete
                    disablePortal
                    options={options}
                    getOptionKey={(option) => option.value}
                    value={selectedOption}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => <TextField {...params} label={label}/>}
                    onChange={(_, item) => onChange(item?.value)}
                    {...field}
                />
            }}/>
    )
}