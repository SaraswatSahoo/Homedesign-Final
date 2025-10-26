export default function Button({buttonText, onClick}:{buttonText?:string, onClick?:()=>void}) {
    return(
        <div className=" w-full h-full flex items-center justify-center">
            <button onClick={onClick} className=" min-w-[300px] px-6 py-3 bg-[#bb9457] text-white text-[18px] font-semibold rounded-md hover:bg-[#bb9557cc] transition-all duration-200">
                {buttonText ? buttonText : "Get Started"}
            </button>
        </div>
    )
}