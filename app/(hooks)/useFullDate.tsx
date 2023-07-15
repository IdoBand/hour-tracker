import { useHourPicker } from "./useHourPicker"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import { useCalendarRow } from "./useCalendarRow"

// this hook is a combination of useCalendarRow and useHourPicker in order to create a Date instance that contains specific date & hour.
export const useFullDate = (date?: Date | undefined, hour?: string) => {

  const { visualHourPicker, selectedHour } = useHourPicker(hour)
  const { calendarRow, selectedDate } = useCalendarRow(date)
  const selectedFullDate: Date = parseISO(format(selectedDate, 'yyyy-MM-dd')+'T'+selectedHour)
  
  const visualFullDate = (
    <div className="flex gap-5">
      {calendarRow}
      {visualHourPicker}
    </div>
  )

  return {
    visualFullDate,
    selectedFullDate
  }
}
