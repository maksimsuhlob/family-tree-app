import {TFunction} from "i18next";

export enum NameEnum {
    aka = 'aka',
    birth = 'birth',
    immigrant = 'immigrant',
    maiden = 'maiden',
    married = 'married',
    user_defined = 'user_defined',
}

export const getNameTypeOptions=(t:TFunction)=>{
    return Object.values(NameEnum).map(type =>({
        value: NameEnum[type],
        label: t(`nameType.${type}`)
    }));
}