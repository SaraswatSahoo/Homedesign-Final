import { useId } from "react";
import { Input } from "../ui/inputSignUp";

export default function InputParameter({parameter, type}: {parameter: string; type: string}) {

    const id = useId();

    return(
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <div className="space-y-2 min-w-[350px]">
                <label htmlFor={id} className=" text-[20px] font-semibold">{parameter}</label>
                <Input id={id} placeholder={parameter} type={type} className=" h-10 text-[18px]" />
            </div>
        </div>
    )
}