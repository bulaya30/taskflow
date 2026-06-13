import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle, Hourglass, type LucideIcon } from "lucide-react"

type SummaryCardType = "pending" | "completed" | "remaining"

type SummaryCardProps = {
    type: SummaryCardType,
    value: number
}
const cardStyles : Record<
    SummaryCardType, {
        icon : LucideIcon,
        color : string
    }
> = {
  pending: {
    icon: Clock,
    color: "text-blue-600"
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-600"
  },
  remaining: {
    icon: Hourglass,
    color: "text-amber-600"
  }
}
const labels : Record<SummaryCardType, string> = {
    pending: "Pending",
    completed: "Completed",
    remaining: "Remaining"
}
    
export default function SummaryCard({type, value} : SummaryCardProps) {    
    const config = cardStyles[type];
    const label = labels[type];

    return (
        <article aria-labelledby={`${type}-summary`}>
            <Card className='shadow-sm hover:shadow-md transition duration-300 space-y-1 hover:bg-muted/30 bg-white/10 backdrop-blur-xl shadow-2xl'>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle id={`${type}-summary`} className={`text-sm text-muted-foreground font-medium ${config.color}`}>
                    <span>{label}</span>
                </CardTitle>
                <config.icon aria-hidden="true" className={`w-4 h-4 ${config.color}`} />
            </CardHeader>
            <CardContent>
                <data 
                    value={value}
                    className={`text-3xl font-bold tracking-tight ${config.color}`}
                >
                    {value}
                </data>
                
            </CardContent>
            </Card>
        </article>
    )
}
