'use client'
import DatePicker from "@/components/business/DatePicker";
import DatePickerRange from "@/components/business/DatePickerRange";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import React from "react";

const Home = () => {
  const [date, setDate] = React.useState<DateRange>()
  const [pivotDate,setPivotDate] = React.useState<Date>()
  const [workingDates,setWorkingDates] = React.useState<Array<number>>([])

  const compareDate = (from: Date, to: Date) => {
    const isDayTheSame = from.getDate() === to.getDate()
    const isMonthTheSame = from.getMonth() === to.getMonth()
    const isYearTheSame = from.getFullYear() === to.getFullYear()

    return isDayTheSame && isMonthTheSame && isYearTheSame
  }

  const handleCountDays = () => {
    if (!date?.from || !date?.to || !pivotDate || pivotDate > date.from) {
      // setIsError(true)
      // setTimeout(() => { setIsError(false) }, 1000)
      return null
    }
    console.log('Starting counting...')
    let currentDay = new Date(pivotDate)
    let iterations = 0
    let mainFlag = true
    const validDays = []
    while (true) {
      if (compareDate(currentDay, date.to)) {
        console.log(currentDay, date.to)
        break
      }
      if (iterations % 2 === 0) {
        mainFlag = !mainFlag
      }
      if ((mainFlag && currentDay >= date.from) || (iterations === 0 && currentDay >= date.from)) {
        iterations === 0 ? validDays.push(currentDay.getDate()) : validDays.push(currentDay.getDate() + 1)
      }
      iterations += 1
      currentDay = new Date(currentDay.getTime() + (24 * 60 * 60 * 1000))
    }
    setWorkingDates([...validDays])
  }
  console.log(date,workingDates)
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-[100px]">
      <DatePickerRange className='w-[300px]' callback={(dates) => setDate(dates)} />
      <DatePicker className="w-[300px]" callback={(date) => setPivotDate(date)}/>
      <Button onClick={handleCountDays} variant={'default'}>Подсчитать</Button>
      <h1>Среди {date?.from?.getDate()} и {date?.to?.getDate()} рабочими днями были: <br/> 
        <strong>{workingDates.join(' ')}</strong>
      
      </h1>
    </main>
  );
}
export default Home;
