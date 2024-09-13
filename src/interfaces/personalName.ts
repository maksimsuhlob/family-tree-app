import {NameEnum} from "../enums/nameEnum";
import {INoteRecord} from "./note";

//gedcom p.71
interface IPersonalNamePieces {
    prefix?: string
    given?: string
    nickname?: string
    surnamePrefix?: string
    surname?: string
    suffix?: string
    notes?: Array<INoteRecord>
}

//gedcom p.72
export interface IPersonalNameStructure {
    type: NameEnum,
    name: IPersonalNamePieces
    romanised?: IPersonalNamePieces
}