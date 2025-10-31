import Button from "@/components/signup/Button";
import Carousel from "@/components/signup/Carousel";
import InputParameter from "@/components/signup/InputParameter";
import { useNavigate } from "react-router";

export default function Signup() {

    const navigate = useNavigate();

    return(
        <div className=" w-screen h-screen flex items-center justify-center bg-[#ffe6a7]">
            <div className=" w-[80%] h-[85%] bg-white rounded-[20px] shadow-lg flex overflow-hidden">
                <div className=" h-full w-[55%] flex items-center justify-center">
                    <Carousel />
                </div>
                <div className=" h-full w-[45%] flex flex-col items-center justify-center p-10 bg-[#99582a] rounded-l-[50px]">
                    <div className=" text-white flex flex-col items-center justify-center">
                        <span className=" text-[40px] font-extrabold mb-5">
                            Create an Account
                        </span>
                        <div className=" w-full flex flex-col items-center justify-center space-y-5 mb-8">
                            <InputParameter parameter="Full Name" type="text"/>
                            <InputParameter parameter="Email" type="email"/>
                            <InputParameter parameter="Phone Number" type="text"/>
                            <InputParameter parameter="Password" type="password"/>
                        </div>
                        <div className=" w-full flex flex-col items-center justify-center gap-4">
                            <span className=" text-[18px] font-semibold">Already have an account ? <span onClick={()=>navigate("/login")} className=" hover:text-[#bb9457] hover:underline transition-text duration-200">Login</span></span>
                            <Button onClick={()=>navigate("/login")} buttonText="SignUp"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}