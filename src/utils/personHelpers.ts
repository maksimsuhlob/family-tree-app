import {IIndividual} from "../interfaces/individual";
import {NameEnum} from "../enums/nameEnum";

export const getBirthSurname = (person: IIndividual): string | null => {
    const birthName = person.names.find((name) => name.type === NameEnum.birth)
    if (birthName && birthName.name.surname) {
        return birthName.name.surname
    }
    return null;
}
export const getBirthFullName = (person: IIndividual): string | null => {
    const birthName = person.names.find((name) => name.type === NameEnum.birth)
    if (birthName) {
        return `${birthName.name.given} ${birthName.name.surname}`
    }
    return null;
}
