'use client'
import { useCalendar } from "@/app/(hooks)/useCalendar"
import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import EditWorkPlaceForm from "./EditWorkPlaceForm";
import CustomButton from "@/components/CustomButton";
import { EllipsisHorizontalCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import { Shift } from "@/types/types";
import { ShiftsManipulator } from "@/app/(hooks)/ShiftsManipulator";
import { TimeHelper } from "@/services/TimeHelper";
import CheckOrX from "@/components/CheckOrX";
import { redirect } from "next/navigation";
import { setCurrentDate } from "@/redux/workPlaceSlice";
import { pageHeader } from "@/app/(hooks)/mixin";
import Modal from "@/components/Modal";
interface MainOverviewProps {
    shifts: Shift[]
}
function totalHoursForPeriod(shifts: Shift[]) {
    if (shifts.length) {
      const dates = ShiftsManipulator.prepareShiftsDatesForTotalCalculation(shifts)
      return TimeHelper.calculateTimeMultipleDates(dates)
    }
    return '0'
}
function totalBreakTime(shifts: Shift[]) {
if (shifts.length) {
    const dates = ShiftsManipulator.prepareBreakDatesForTotalCalculation(shifts)
    return TimeHelper.calculateTimeMultipleDates(dates)
}
return '0'
}
const MainOverview = ({shifts}: MainOverviewProps) => {
  const currentWorkPlace = useAppSelector(state => state.workPlaceSlice.currentWorkPlace)
  if (!currentWorkPlace) {
      redirect('/dashboard')
  }
  const dispatch = useAppDispatch()
  const currentDate = useAppSelector(state => state.workPlaceSlice.currentDate)
  const { visualCalendar, selectedDay } = useCalendar(true, shifts, handleDayButtonClick)
  const currentMonthShifts = ShiftsManipulator.filterShiftsByMonthAndYear(shifts, TimeHelper.deserializeDate(currentDate))
  const [isEditingWorkPlace, setIsEditingWorkPlace] = useState<boolean>(false)
  const [isCalendarHelp, setIsCalendarHelp] = useState<boolean>(false)
  function handleDayButtonClick(day: Date) {
    const serializedDate = TimeHelper.serializeDate(day)
    dispatch(setCurrentDate(serializedDate))
  }

  return (
  <>
    <div className={`${pageHeader}`}>{currentWorkPlace.name}</div>
    <div className='flex w-full md:flex-col'>
      <div className='w-max p-3 shadow-lg rounded-lg md:w-full'>
        {visualCalendar}
        <div className="text-sm border-t-[1px] border-t-grayBorder pt-1">
          <CustomButton 
            className=""
            where="right"
            hoverText='How To Use Calender' 
            onClick={() => setIsCalendarHelp(prev => !prev)}
            >
            <InformationCircleIcon className="w-6" />
          </CustomButton>
          
        </div>
      </div>
      <div className={`flex flex-grow w-1/2 flex-col shadow-lg rounded-lg p-4 gap-4 md:w-full md:px-2 md:text-sm`}>
        
        <div className={`p-1 flex w-full flex-col rounded-lg gap-1`}>
          <span className='w-full font-semibold text-lg underline md: text-center'>Monthly Overview</span>
          <span className='font-semibold'>{`Expected Salary: `} <span className='font-normal'>{`${ShiftsManipulator.calculateSalary(currentMonthShifts)} ₪`}</span></span>
          <span className='font-semibold'>{`Total Time: `}<span className='font-normal'>{`${totalHoursForPeriod(currentMonthShifts)}`}</span></span>
          <span className='font-semibold'>{`Total Break Time: `}<span className='font-normal'>{`${totalBreakTime(currentMonthShifts)}`}</span></span>
        </div>
        
        <div className={`p-1 flex w-full flex-col rounded-lg gap-1 relative`}>

            <span className='w-full font-semibold text-lg underline md: text-center'>Work Place Overview</span>
            {isEditingWorkPlace ? 
            <>
            <EditWorkPlaceForm workPlace={currentWorkPlace} onClose={() => setIsEditingWorkPlace(false)} />
            </>
            :
            <>
            <span className='font-semibold flex'>{`Currently Employed: `}<CheckOrX itemToCheck={currentWorkPlace!.isCurrent} /></span>
            <span className="font-semibold">{`Wage Per Hour: `} <span className='font-normal'>{`${currentWorkPlace?.wagePerHour} ₪`}</span></span>
            <span className="font-semibold">{`Started Working at: `}<span className='font-normal'>{TimeHelper.ddmmyyyyDate(TimeHelper.deserializeDate(currentWorkPlace.employmentStartDate as string))}</span></span>
            <span className="font-semibold">{`Employment Duration: `}<span className='font-normal'>{currentWorkPlace.employmentDuration}</span></span>
            <span className="font-semibold">{`Breaks Duration: `}<span className='font-normal'>{`${totalBreakTime(shifts)}`}</span></span>
            </>
            }
            <CustomButton 
              className='absolute top-10 right-1 w-5' 
              onClick={() => setIsEditingWorkPlace(prev => !prev)}
              hoverText={isEditingWorkPlace ? 'Discard' : 'Edit'}
              where={'down'}
            >
                {isEditingWorkPlace ? <XCircleIcon className='w-5' /> : <EllipsisHorizontalCircleIcon className='w-5' />}
            </CustomButton>

        </div>
      </div>
    </div>
    {isCalendarHelp &&
      <Modal onClose={() => setIsCalendarHelp(false)}>
      
      <div className="w-full flex justify-center">
        <div className="p-10 max-w-lg">
          <div className={`${pageHeader} pb-6`}>How To Use Calendar</div>
        {`Use the arrow buttons or the month's name that are located at the top to select a month and then click any day in order to get a full list of the month's shifts.`}
        </div>
      </div>  
    </Modal>}
  </>
    
  )
}

export default MainOverview