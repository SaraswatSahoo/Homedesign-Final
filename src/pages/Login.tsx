import Button from "@/components/signup/Button";
import Carousel from "@/components/signup/Carousel";
import InputParameter from "@/components/signup/InputParameter";

export default function Login() {
    return(
        <div className=" w-screen h-screen flex items-center justify-center bg-[#ffe6a7]">
            <div className=" w-[80%] h-[85%] bg-white rounded-[20px] shadow-lg flex overflow-hidden">
                <div className=" h-full w-[55%] flex items-center justify-center">
                    <Carousel />
                </div>
                <div className=" h-full w-[45%] flex flex-col items-center justify-center p-10 bg-[#99582a] rounded-l-[50px]">
                    <div className=" text-white flex flex-col items-center justify-center">
                        <span className=" text-[40px] font-extrabold mb-5">
                            LOG IN
                        </span>
                        <div className=" w-full flex flex-col items-center justify-center space-y-5 mb-10">
                            <InputParameter parameter="Email" type="email"/>
                            <InputParameter parameter="Phone Number" type="text"/>
                        </div>
                        <div className=" w-full flex items-center justify-center">
                            <Button />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}