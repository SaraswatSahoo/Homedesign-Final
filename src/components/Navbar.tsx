import { User } from "lucide-react";

export default function Navbar() {
    return(
        <div className=" w-[98%] h-16 bg-white shadow-md flex items-center justify-between px-8 rounded-[10px]">
            <span className=" text-[30px] font-bold">HOME<span className=" text-[#99582a]">DESIGN</span></span>
            <div className=" flex items-center justify-center gap-2 text-[22px] font-semibold ">
                <User />
                <span>Saraswat Sahoo</span>
            </div>
        </div>
    )
}