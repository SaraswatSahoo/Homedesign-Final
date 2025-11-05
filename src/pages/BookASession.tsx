import BookFreeSessionForm from "@/components/bookasession/Form";

export default function BookASession() {
    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-[#ffe6a7] p-4">
            <BookFreeSessionForm onBackToHome={() => window.location.href = "/landing"} />
        </div>
    )
}