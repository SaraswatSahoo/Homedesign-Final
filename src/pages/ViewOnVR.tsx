import ViewOnVRForm from "@/components/viewonvr/Form";

export default function ViewOnVR() {
    return(
        <div className="w-screen min-h-screen flex items-center justify-center bg-[#ffe6a7] p-4">
            <ViewOnVRForm onBackToHome={() => window.location.href = "/landing"} />
        </div>
    )
}