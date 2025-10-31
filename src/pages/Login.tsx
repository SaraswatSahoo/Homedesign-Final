import Button from "@/components/signup/Button";
import Carousel from "@/components/signup/Carousel";
import InputParameter from "@/components/signup/InputParameter";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();

    return(
        <div className="w-screen min-h-screen flex items-center justify-center bg-[#ffe6a7] p-4">
            <div className="w-full max-w-[90%] lg:max-w-[80%] min-h-[85vh] bg-white rounded-[20px] shadow-lg flex flex-col lg:flex-row overflow-hidden">
                {/* Carousel Section */}
                <div className="w-full lg:w-[55%] flex items-center justify-center lg:h-auto">
                    <Carousel />
                </div>
                
                {/* Login Form Section */}
                <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-6 sm:p-10 bg-[#99582a] lg:rounded-l-[50px]">
                    <div className="text-white flex flex-col items-center justify-center w-full max-w-md">
                        <span className="text-3xl sm:text-[40px] font-extrabold mb-5 text-center">
                            LOG IN
                        </span>
                        <div className="w-full flex flex-col items-center justify-center space-y-5 mb-10">
                            <InputParameter parameter="Email" type="email"/>
                            <InputParameter parameter="Phone Number" type="text"/>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center gap-4">
                            <span className="text-base sm:text-[18px] font-semibold text-center">
                                Don't have an account ? 
                                <span 
                                    onClick={()=>navigate("/signup")} 
                                    className="hover:text-[#bb9457] hover:underline transition-text duration-200 cursor-pointer ml-1"
                                >
                                    SignUp
                                </span>
                            </span>
                            <Button onClick={()=>navigate("/landing")} buttonText="Login"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}