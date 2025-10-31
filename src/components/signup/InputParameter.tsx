import { useId } from "react";
import { Input } from "../ui/inputSignUp";

export default function InputParameter({parameter, type}: {parameter: string; type: string}) {
    const id = useId();

    return(
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="space-y-2 w-full max-w-[350px] px-4 sm:px-0">
                <label htmlFor={id} className="text-lg sm:text-[20px] font-semibold block">{parameter}</label>
                <Input id={id} placeholder={parameter} type={type} className="h-10 text-base sm:text-[18px] w-full" />
            </div>
        </div>
    )
}