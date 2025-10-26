import { useId } from "react";
import { Input } from "../ui/input";

export default function InputParameter({parameter, type}: {parameter: string; type: string}) {

    const id = useId();

    return(
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <div className="space-y-2 min-w-[300px]">
                <label htmlFor={id} className=" text-[18px] font-semibold">{parameter}</label>
                <Input id={id} placeholder={parameter} type={type} />
            </div>
        </div>
    )
}