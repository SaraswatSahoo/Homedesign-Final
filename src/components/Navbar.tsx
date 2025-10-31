import { User } from "lucide-react";

export default function Navbar() {
    return(
        <div className="w-[98%] h-16 bg-white shadow-md flex items-center justify-between px-4 sm:px-6 md:px-8 rounded-[10px]">
            <span className="text-xl sm:text-2xl md:text-[30px] font-bold">
                HOME<span className="text-[#99582a]">DESIGN</span>
            </span>
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-lg md:text-[22px] font-semibold">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden lg:inline">Mankrish Global</span>
                <span className="lg:hidden">MG</span>
            </div>
        </div>
    )
}