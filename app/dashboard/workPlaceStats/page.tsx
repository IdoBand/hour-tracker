'use client'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useCalendar } from '../../(hooks)/useCalender';
const WorkPlaceStats = () => {
  const currentWorkPlace = useAppSelector(state => state.placesSlice.currentWorkPlace)
  const user = useAppSelector(state => state.userSlice.user)
  const { visualCalendar, selectedDay } = useCalendar(true)
  return (
    <main>
      {visualCalendar}
    </main>
  )
}

export default WorkPlaceStats