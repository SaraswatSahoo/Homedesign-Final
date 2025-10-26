import { useId } from "react";
import { Input } from "../ui/inputSignUp";

export default function InputParameter({parameter, type}: {parameter: string; type: string}) {

    const id = useId();

    return(
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <div className="space-y-2 min-w-[400px]">
                <label htmlFor={id} className=" text-[25px] font-semibold">{parameter}</label>
                <Input id={id} placeholder={parameter} type={type} className=" h-[50px] text-[20px]" />
            </div>
        </div>
    )
}