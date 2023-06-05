import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { checkBoxStyle, dashBoardWorkPlaceHeader } from '@/app/(hooks)/mixin';
import { TimeHelper } from '@/app/(hooks)/TimeHelper'
import { format, parseISO } from 'date-fns'
import { flexCenter } from '@/app/(hooks)/mixin'
import Button from '@/app/(components)/Button'
import Modal from '@/app/(components)/Modal'
import { useAppDispatch } from '@/redux/hooks'
import { removeShifts } from '@/redux/placesSlice'
import AddEditShift from './AddEditShiftForm'
export interface Shift {
    shiftId: string
    placeId: string,
    shiftStart: string
    shiftEnd: string
    breakStart: string
    breakEnd: string
    iWorkedOn: string
    notes: string
    checked: boolean
}

function parseISOString(string: string): string {
    const ISODate = parseISO(string)
    return format(ISODate, 'dd-MM-yyyy')
}

const slideDownDiv = {
    // when using this -> add to motion.div className 'overflow-hidden'
    initial: {
        height: 0,
        opacity: 0,
    },
    animate: {
        opacity: 1,
        height: "auto",
        transition: {
            duration: 1
        },
    }
}
const checkOrX = (str: string) => {
    return str ?  <CheckCircleIcon className='w-5 fill-green-500' /> : <XCircleIcon className='w-5 fill-red-400'/>
  }
interface ShiftComponentProps {
    shift: Shift
    removeButtons: boolean
    handleCheckBoxClick: (shiftId: string) => void
}
export default function ShiftComponent ({removeButtons, handleCheckBoxClick, shift}: ShiftComponentProps) {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [removalModal, setRemovalModal] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const shiftData = {
        shiftDate: parseISOString(shift.shiftStart),
        shiftStart: shift.shiftStart.slice(11, 16),
        shiftEnd: shift.shiftEnd.slice(11, 16),
        shiftDuration: TimeHelper.calculateTimeTwoDatesString(shift.shiftStart, shift.shiftEnd),
        breakStart: shift.breakStart.slice(11, 16),
        breakEnd: shift.breakEnd.slice(11, 16),
        breakDuration: TimeHelper.calculateTimeTwoDatesString(shift.breakStart, shift.breakEnd),
    }

    const MotionArrow = () => {
        return (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? -180 : 0 }}
            transition={{ duration: 1}}
            className={`${flexCenter}`}
          >
            <ArrowUpCircleIcon className='w-5' />
          </motion.div>
        );
      };

  return (
    <div className={`w-full flex justify-between flex-col rounded-lg py-1 cursor-pointer`}>
            <div className={`w-full grid grid-cols-7 grid-flow-col rounded-lg px-2 py-1
                ${isOpen && 'bg-gray-200'}
                border border-black hover:bg-sky-100
                `}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span className={`col-start-1 col-end-2 w-full`}>{shiftData.shiftDate}</span>
                <span className={`col-start-2 col-end-3 w-full`}>{shiftData.shiftStart}</span>
                <span className={`col-start-3 col-end-4 w-full`}>{shiftData.shiftEnd}</span>
                <span className={`col-start-4 col-end-5 w-full`}>{shiftData.shiftDuration}</span>
                <span className={`col-start-5 col-end-6 w-full`}>{shiftData.breakDuration}</span>
                <span className={`col-start-6 col-end-7 w-full`}>{checkOrX(shift.iWorkedOn)}</span>
                <span className={`col-start-7 col-end-8 w-full flex justify-between relative`}>{checkOrX(shift.notes)}{removeButtons && <input 
                                    data-key={shift.shiftId}
                                    type='checkbox' 
                                    checked={shift.checked} 
                                    onClick={(e) => e.stopPropagation()} 
                                    onChange={(e) => {handleCheckBoxClick(e.target.dataset.key as string)}}
                                    className={`appearance-none rounded-full w-5 h-5 border-2 border-black outline-none cursor-pointer transition-colors duration-200 ease-in-out absolute top-0.5 right-6
                                    checked:bg-red-500 checked:before:absolute checked:before:content-['X'] checked:before:text-light checked:before:left-1/2 checked:before:top-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2`} />}{MotionArrow()}</span>
            </div>
        {isOpen && 
            <motion.article 
                variants={slideDownDiv}
                initial="initial"
                animate="animate"
            className={`w-full min-h-max shadow-md rounded-lg px-2 py-1 overflow-hidden`}>
                {editMode ?
                    <AddEditShift 
                        addOrEdit='edit'
                        onClose={() => setEditMode(false)}
                        iWorkedOn={shift.iWorkedOn}
                        notes={shift.notes}
                        startDate={shift.shiftStart}
                        endDate={shift.shiftEnd}
                        breakStart={shift.breakStart}
                        breakEnd={shift.breakEnd}
                        shiftId={shift.shiftId}
                    />
                :
                    <div className='p-8 flex gap-4'>
                        <div className='w-[20%] flex flex-col gap-2'>
                            <div >
                                <span className='font-semibold'>Shift Start: </span> 
                                <span>{shiftData.shiftStart}</span>
                            </div>
                            <div >
                                <span className='font-semibold'>Shift End: </span> 
                                <span>{shiftData.shiftEnd}</span>
                            </div>
                            <div >
                                <span className='font-semibold'>Shift Duration: </span> 
                                <span>{shiftData.shiftDuration}</span>
                            </div>
                            <div >
                                <span className='font-semibold'>Break Duration: </span> 
                                <span>{shiftData.breakDuration}</span>
                            </div>
                            {shiftData.breakDuration !== '0' && 
                                <>
                                    <div >
                                        <span className='font-semibold'>Break Start: </span> 
                                        <span>{shift.breakStart}</span>
                                    </div>
                                    <div >
                                        <span className='font-semibold'>Break End: </span> 
                                        <span>{shift.breakEnd}</span>
                                    </div>
                                </>
                            }
                        </div>
                        <div className={'w-4/6 flex flex-col gap-2'}>
                            <div className='flex flex-col'>
                                <div className='font-semibold'>
                                I Worked On: 
                                </div>
                                {shift.iWorkedOn}
                            </div>
                            <div className='flex flex-col'>
                                <div className='font-semibold'>
                                Notes: 
                                </div>
                                {shift.notes}
                            </div>
                        </div>
                        <div className='w-[10%] flex items-end flex-col gap-2'>
                            <Button theme='full' onClick={() => setEditMode(true)} className='text-xs px-7' text='Edit' type='button'/>
                            <Button theme='full' onClick={() => setRemovalModal(true)} className='text-xs' text='Remove' type='button'/>
                        </div>
                    </div>
                }
            </motion.article>
        }
        {removalModal && <Modal onClose={() => setRemovalModal(false)} className=''>
            <div className='flex flex-col gap-8 px-6 pb-4'>
                Are you sure you want to remove this shift?
                <div className={`${flexCenter} gap-4 `}>
                    <Button theme='blank' onClick={() => setRemovalModal(false)} className='' text='No' type='button'/>
                    <Button theme='full' onClick={() => {dispatch(removeShifts([shift.shiftId])); setIsOpen(false); setRemovalModal(false)}} className='' text='Yes' type='button'/>
                </div>
            </div>
            </Modal>}
    </div>
  )
}