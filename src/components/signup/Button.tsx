export default function Button({buttonText, onClick}:{buttonText?:string, onClick?:()=>void}) {
    return(
        <div className="w-full h-full flex items-center justify-center px-4 sm:px-0">
            <button 
                onClick={onClick} 
                className="w-full max-w-[350px] px-6 py-2 bg-[#bb9457] text-white text-lg sm:text-[20px] font-semibold rounded-md hover:bg-[#bb9557cc] transition-all duration-200"
            >
                {buttonText ? buttonText : "Get Started"}
            </button>
        </div>
    )
}