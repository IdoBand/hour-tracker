'use client'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useCalendar } from '../../(hooks)/useCalender';
import { Shift } from './Shift';
import { dashBoardWorkPlaceHeader, pageHeader } from '@/app/(hooks)/mixin';
import ShiftComponent from './Shift'
import { TimeHelper } from '@/app/(hooks)/TimeHelper';
import { isSameMonth, parseISO } from 'date-fns'
import AddRemoveEditButtons from '@/app/(components)/AddRemoveEditButtons';
import { useState, useRef } from 'react';
import FramerSpringRotate from '@/app/(components)/FramerSpringRotate';
import AddEditShift from './AddEditShiftForm';
import { ShiftsManipulator } from '@/app/(hooks)/ShiftsManipulator';
import { removeShifts, setShiftCheckBox, checkBoxAllShifts } from '@/redux/placesSlice';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import Redirect from '@/app/(components)/Redirect';
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

const WorkPlaceStats = () => {
  const currentWorkPlace = useAppSelector(state => state.placesSlice.currentWorkPlace)
  if (!currentWorkPlace) {
    return <Redirect to='/dashboard' />
  }
  const { visualCalendar, selectedDay } = useCalendar(true, currentWorkPlace!.shifts)
  const [addShiftForm, setAddEditShiftForm] = useState<boolean>(false)
  const [removeButtons, setRemoveButtons] = useState<boolean>(false)
  const firstSelectAllClick = useRef<boolean>(false)
  const user = useAppSelector(state => state.userSlice.user)
  const dispatch = useAppDispatch()
  const shifts: Shift[] = currentWorkPlace!.shifts.filter(shift => {
    if (isSameMonth(selectedDay, parseISO(shift.shiftStart))) {
      return shift
    }
  })
  

  function handleCheckBoxClick(shiftId: string) {
    firstSelectAllClick.current = false
    dispatch(setShiftCheckBox(shiftId))
  }
  function selectAll() {
    dispatch(checkBoxAllShifts(firstSelectAllClick.current))
    if (!firstSelectAllClick.current) {
        firstSelectAllClick.current = true
    }
  }
  function handleRemovePermanentlyClick() {
    const shiftsIdsArray: string[] = []
    for (const shift of shifts) {
      shift.checked && shiftsIdsArray.push(shift.shiftId)
    }
    dispatch(removeShifts(shiftsIdsArray))
  }

  return (
    <main className={`w-full flex justify-center items-center flex-col`}>
      <div className={`w-10/12 flex justify-center items-start flex-col py-2 gap-4`}>
        <div className={`${pageHeader} my-3`}>
          Overview
        </div>
        <div className='flex w-full md:flex-col'>
          <div className='w-1/2 p-3 shadow-lg rounded-lg md:w-full'>
            {visualCalendar}
          </div>
          <div className={`flex w-1/2 flex-col shadow-lg rounded-lg p-4 gap-4 md:w-full md:text-sm`}>
            
            <div className={`p-1 flex w-full flex-col rounded-lg gap-1`}>
              <span className='w-full font-semibold text-lg underline md: text-center'>Monthly Overview</span>
              <span>{`Expected Salary: `} <span className='font-semibold'>{`${ShiftsManipulator.calculateSalary(shifts)} ₪`}</span></span>
              <span>{`Total Time: `}<span className='font-semibold'>{`${totalHoursForPeriod(shifts)}`}</span></span>
              <span>{`Total Break Time: `}<span className='font-semibold'>{`${totalBreakTime(shifts)}`}</span></span>
            </div>
            
            <div className={`p-1 flex w-full flex-col rounded-lg gap-1`}>
              <span className='w-full font-semibold text-lg underline md: text-center'>Work Place Overview</span>
              <span>{`Wage Per Hour: `} <span className='font-semibold'>{`${currentWorkPlace?.wagePerHour} ₪`}</span></span>
              <span>{`Total Employment Duration: `}<span className='font-semibold'>{`${totalHoursForPeriod(currentWorkPlace!.shifts)}`}</span></span>
              <span>{`Total Break Duration: `}<span className='font-semibold'>{`${totalBreakTime(currentWorkPlace!.shifts)}`}</span></span>
            </div>
          </div>
        </div>
        <div className={`flex justify-between w-full`}>
          <h1 className={`${dashBoardWorkPlaceHeader}`}>Shifts</h1>
          <AddRemoveEditButtons 
              handleAddClick={() => setAddEditShiftForm(true)} 
              handleRemoveClick={() => setRemoveButtons((prev) => !prev)} 
              handleSelectAll={selectAll} 
              handleRemovePermanentlyClick={handleRemovePermanentlyClick}
              />
        </div>
        {addShiftForm &&
          <FramerSpringRotate className='shadow-2xl rounded-2xl'>
            <AddEditShift addOrEdit='add' onClose={() => setAddEditShiftForm(false)} />
          </FramerSpringRotate>
        }
        <div className='w-full gap-2'>
          <div className={`w-full bg-sky-200 rounded-lg grid grid-cols-7 grid-flow-col px-2 py-1
            lg:grid-cols-3
          `}
          >
            <span className={`w-full flex order-8 opacity-0`}><ArrowUpCircleIcon className='w-5'/></span>
            <span className={`col-start-1 col-end-2 w-full lg:flex lg:justify-center`}>Date</span>
            <span className={`col-start-2 col-end-3 w-full lg:flex lg:justify-center`}>Start</span>
            <span className={`col-start-3 col-end-4 w-full lg:flex lg:justify-center`}>End</span>
            <span className={`col-start-4 col-end-5 w-full lg:hidden`}>Duration</span>
            <span className={`col-start-5 col-end-6 w-full lg:hidden`}>Break</span>
            <span className={`col-start-6 col-end-7 w-full lg:hidden`}>I Worked On</span>
            <span className={`col-start-7 col-end-8 w-full lg:hidden`}>Notes</span>
          </div>
          <div className='w-full gap-2 flex-col-reverse'>
            {shifts.length ? 
            shifts.map((shift) => {
              return <div key={shift.shiftId} className='w-full'>
                <ShiftComponent 
                  shift={shift} 
                  removeButtons={removeButtons} 
                  handleCheckBoxClick={handleCheckBoxClick} />
              </div>
            })
            :
            <h2 className='w-full text-center my-4'>No shifts this month :(</h2>
            }
          </div>
        </div>
      </div>
      
    </main>
  )
}

export default WorkPlaceStats