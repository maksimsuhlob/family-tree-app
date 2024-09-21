import {IPersonalNameStructure} from "./personalName";
import {GenderEnum} from "../enums/genderEnum";
import {INoteRecord} from "./note";

//gedcom p.61
export interface IIndividual {
    // id: string;
    names: Array<IPersonalNameStructure>;
    sex: GenderEnum
    events?: Array<any>//p69
    attributes?: Array<any>//p68
    childToFamilyLink?: Array<string>//p67
    spouseToFamilyLink?: Array<string>//p75
    association?: Array<string>//p65
    author?: any//p107
    changeDate: string//p66
    notes?: Array<INoteRecord>//p71
    citation?: Array<any>//p73
    multimediaLinks?: Array<string>//p71
}

export interface IIndividualRecord extends IIndividual {
    id: string
}
