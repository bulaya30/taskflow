import { Loader2 } from "lucide-react"

export default function Loader() {
    return (
        <section
            aria-label="loading"
            className="py-10 text-center h-screen"
        >
            <h2
                className="flex justify-center items-center font-semibold gap-2"
            >
                <Loader2 className="w-7 h-7 animate-spin" />
                <span>Loading...</span>
            </h2>
        </section>
    )
}
