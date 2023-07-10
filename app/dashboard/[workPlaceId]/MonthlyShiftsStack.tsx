'use client'
import { useState } from 'react'
import ShiftCard from './ShiftCard'
import { Shift } from '@/types/types'
import ShiftComponent from './ShiftCard'
import AddRemoveEditButtons from '@/components/AddRemoveEditButtons'
import FramerSpringRotate from '@/components/FramerSpringRotate'
import AddEditShift from './AddEditShiftForm'
import { ArrowUpCircleIcon, EllipsisHorizontalCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { dashBoardWorkPlaceHeader } from '@/app/(hooks)/mixin'
import { TimeHelper } from '@/services/TimeHelper'
import { useAppSelector } from '@/redux/hooks'
import { ShiftsManipulator } from '@/app/(hooks)/ShiftsManipulator'
interface Props {
    shifts: Shift[]
}
const MonthlyShiftsStack = ({shifts}: Props) => {
    const [removeButtons, setRemoveButtons] = useState<boolean>(false)
    const [addShiftForm, setAddEditShiftForm] = useState<boolean>(false)
    const currentDate = useAppSelector(state => state.workPlaceSlice.currentDate)
    const currentMonthShifts = ShiftsManipulator.filterShiftsByMonthAndYear(shifts, TimeHelper.deserializeDate(currentDate))
  return (
    <>
    
    <div className={`flex justify-between w-full`}>
        <h1 className={`${dashBoardWorkPlaceHeader}`}>Shifts</h1>
            <AddRemoveEditButtons 
              handleAddClick={() => setAddEditShiftForm(true)} 
              handleRemoveClick={() => setRemoveButtons((prev) => !prev)} 
              handleSelectAll={() => {return}} 
              handleRemovePermanentlyClick={() => {return}}
              addHoverText='Add a Shift'
              removeHoverText='Remove Shifts'
            />
        </div>
        {addShiftForm &&
          <FramerSpringRotate className='shadow-2xl rounded-2xl relative z-20'>
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
          <div className='w-full gap-2 flex-col'>
            {currentMonthShifts.length > 0 ? 
            currentMonthShifts.map((shift) => {
              return (
              <div key={shift.id} className='w-full'>
                <ShiftComponent 
                  shift={shift} 
                  removeButtons={removeButtons} 
                  handleCheckBoxClick={() => {return}} />
              </div>)
            })
            :
            <h2 className='w-full text-center my-4'>No shifts this month :(</h2>
            }
          </div>
        </div>
    </>
  )
}

export default MonthlyShiftsStack