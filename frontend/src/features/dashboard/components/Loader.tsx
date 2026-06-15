import { Loader2 } from "lucide-react"

export default function Loader() {
    return (
        <div className="flex justify-center items-center font-semibold gap-2 h-screen">
            <Loader2 className="w-7 h-7 animate-spin" />
            Loading...
        </div>
    )
}
