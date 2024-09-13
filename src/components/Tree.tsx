import {IIndividualRecord} from "../interfaces/individual";

interface TreeProps {
    data: IIndividualRecord[]
}
export default function Tree({ data }: TreeProps) {
console.log(data)
}