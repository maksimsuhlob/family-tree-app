import {TFunction} from "i18next";

export enum GenderEnum {
    male = 'male',
    female = 'female',
    unknown = 'unknown',
}

export const getGenderOptions=(t:TFunction)=>{
    return Object.values(GenderEnum).map(gender =>({
        value: GenderEnum[gender],
        label: t(`gender.${gender}`)
    }));
}