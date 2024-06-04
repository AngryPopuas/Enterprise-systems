"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const DatePicker = ({ className, callback }: { className?: string, callback: (dates: Date | undefined) => void }) => {
    const [date, setDate] = React.useState<Date>()

    React.useEffect(() => {
        callback(date)
    }, [date])

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <h1>Выберите последний рабочий день:</h1>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ru }) : <span>Выберите последний рабочий день</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
export default DatePicker