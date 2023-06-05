'use client'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useCalendar } from '../../(hooks)/useCalender';
import { Shift } from './Shift';
import { dashBoardWorkPlaceHeader } from '@/app/(hooks)/mixin';
import ShiftComponent from './Shift'
import { TimeHelper } from '@/app/(hooks)/TimeHelper';
import { isSameMonth, parseISO } from 'date-fns'
import AddRemoveEditButtons from '@/app/(components)/AddRemoveEditButtons';
import { useState, useRef } from 'react';
import FramerSpringRotate from '@/app/(components)/FramerSpringRotate';
import AddEditShift from './AddEditShiftForm';
import { ShiftsManipulator } from '@/app/(hooks)/ShiftsManipulator';
import { removeShifts, setShiftCheckBox, checkBoxAllShifts } from '@/redux/placesSlice';

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
        <div className={`${dashBoardWorkPlaceHeader} my-3`}>
          Overview
        </div>
        <div className='flex w-full'>
          <div className='block w-2/3 shadow-lg rounded-lg'>
            {visualCalendar}
          </div>
          <div className={`flex w-1/3 flex-col shadow-lg rounded-lg p-4 gap-4`}>
            
            <div className={`p-1 flex w-full flex-col rounded-lg gap-1`}>
              <span className='w-full font-semibold text-lg underline'>Monthly Overview</span>
              <span>{`Expected Salary: `} <span className='font-semibold'>{`${ShiftsManipulator.calculateSalary(shifts, 44)} ₪`}</span></span>
              <span>{`Total Time: `}<span className='font-semibold'>{`${totalHoursForPeriod(shifts)}`}</span></span>
              <span>{`Total Break Time: `}<span className='font-semibold'>{`${totalBreakTime(shifts)}`}</span></span>
            </div>
            
            <div className={`p-1 flex w-full flex-col rounded-lg gap-1`}>
              <span className='w-full font-semibold text-lg underline'>Work Place Overview</span>
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
          <div className={`w-full bg-sky-200 rounded-lg grid grid-cols-7 grid-flow-col px-2 py-1`}>
            <span className={`col-start-1 col-end-2 w-full`}>Date</span>
            <span className={`col-start-2 col-end-3 w-full`}>Start</span>
            <span className={`col-start-3 col-end-4 w-full`}>End</span>
            <span className={`col-start-4 col-end-5 w-full`}>Duration</span>
            <span className={`col-start-5 col-end-6 w-full`}>Break</span>
            <span className={`col-start-6 col-end-7 w-full`}>I Worked On</span>
            <span className={`col-start-7 col-end-8 w-full`}>Notes</span>
          </div>
          <div className='w-full gap-2 flex-col-reverse'>
            {shifts.length ? 
            shifts.map((shift, idx) => {
              return <div key={idx} className='w-full'>
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