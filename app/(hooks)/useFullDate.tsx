import { useState, useRef, useEffect } from "react"
import { useHourPicker } from "./useHourPicker"
import { useCalendar } from "./useCalender"
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'
import format from "date-fns/format"
import Button from "../../components/Button"

export const useFullDate = (date?: Date | undefined, hour?: string) => {
  const [isCalender, setIsCalender] = useState<boolean>(false)
  const { visualCalendar, selectedDay } = useCalendar(false, [], undefined, date ? date : undefined)
  const { visualHourPicker, selectedHour } = useHourPicker(hour)
  const selectedFullDate = format(selectedDay, 'yyyy-MM-dd')+'T'+selectedHour
  
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalender(false)
      }
    }
    if (isCalender) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCalender])

  const visualFullDate = (
    <div className='relative flex items-center gap-2 xs:flex-col'>
      <label 
        className='w-max px-2 flex gap-1 py-1 cursor-pointer md:w-full rounded-md bg-white'
        onClick={() => setIsCalender(prev => !prev)}
      >
        {format(selectedDay, 'dd-MM-yyyy')}
        <ArrowDownCircleIcon className='w-5' />
      </label>
      
      {isCalender && 
        <div ref={calendarRef} className='absolute top-10 shadow-lg bg-light w-max py-2 rounded-xl z-10'>
          {visualCalendar}
          <div className='w-11/12 flex justify-end'>
            <Button type='submit' theme='full' text='OK' className='text-xs' onClick={() => setIsCalender(false)}/>
          </div>
        </div>
      }
      {visualHourPicker}
    </div>
  )

  return {
    isCalender,
    setIsCalender,
    visualFullDate,
    selectedDay,
    selectedHour,
    selectedFullDate
  }
}
