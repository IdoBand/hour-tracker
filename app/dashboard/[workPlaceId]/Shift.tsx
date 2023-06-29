import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpCircleIcon, EllipsisHorizontalCircleIcon} from '@heroicons/react/24/solid'
import { checkboxRemoveStyle } from '@/app/(hooks)/mixin';
import { TimeHelper } from '@/app/(hooks)/TimeHelper'
import { format, parseISO } from 'date-fns'
import { flexCenter } from '@/app/(hooks)/mixin'
import Button from '@/app/(components)/Button'
import Modal from '@/app/(components)/Modal'
import { useAppDispatch } from '@/redux/hooks'
import { removeShifts } from '@/redux/placesSlice'
import AddEditShift from './AddEditShiftForm'
import CheckOrX from '@/app/(components)/CheckOrX';
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
    wagePerHour: number,
    tipBonus: number
}

function parseISOString(string: string): string {
    const ISODate = parseISO(string)
    return format(ISODate, 'dd-MM-yyyy')
}
const shiftPropertyContainer = 'w-full'
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

interface ShiftComponentProps {
    shift: Shift
    removeButtons: boolean
    handleCheckBoxClick: (shiftId: string) => void
}
export default function ShiftComponent ({removeButtons, handleCheckBoxClick, shift}: ShiftComponentProps) {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [removalModal, setRemovalModal] = useState<boolean>(false)
    const [shiftOptionsMenu, setShiftOptionsMenu] = useState<boolean>(false)
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
    <div className={`w-full flex justify-between flex-col rounded-lg py-1 cursor-pointer relative`}>
        {removeButtons && <input 
                data-key={shift.shiftId}
                type='checkbox' 
                checked={shift.checked} 
                onClick={(e) => e.stopPropagation()} 
                onChange={(e) => {handleCheckBoxClick(e.target.dataset.key as string)}}
                className={checkboxRemoveStyle} />}
            <div className={`w-full grid grid-cols-7 grid-flow-col rounded-lg px-2 py-1 
                ${isOpen && 'bg-gray-200'}
                border border-black hover:bg-sky-100
                lg:grid-cols-3 lg:text-sm
                `}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span className={`w-full order-8`}>{MotionArrow()}</span>
                <span className={`col-start-1 col-end-2 w-full`}>{shiftData.shiftDate}</span>
                <span className={`col-start-2 col-end-3 w-full lg:flex lg:justify-center`}>{shiftData.shiftStart}</span>
                <span className={`col-start-3 col-end-4 w-full lg:flex lg:justify-center`}>{shiftData.shiftEnd}</span>
                <span className={`col-start-4 col-end-5 w-full lg:hidden`}>{shiftData.shiftDuration}</span>
                <span className={`col-start-5 col-end-6 w-full lg:hidden`}>{shiftData.breakDuration}</span>
                <span className={`col-start-6 col-end-7 w-full lg:hidden`}><CheckOrX itemToCheck={shift.iWorkedOn} /></span>
                <span className={`col-start-7 col-end-8 w-full lg:hidden`}><CheckOrX itemToCheck={shift.notes} /></span>
                
            </div>
        {isOpen && 
            <motion.article 
                variants={slideDownDiv}
                initial="initial"
                animate="animate"
            className={`w-full min-h-max shadow-md rounded-lg px-2 py-1 overflow-hidden cursor-default`}>
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
                        wagePerHour={shift.wagePerHour}
                        tipBonus={shift.tipBonus}
                    />
                :
                    <div className='p-8 flex gap-4 relative md:flex-col md:p-2'>
                        <div className='w-2/6 flex flex-col gap-2 lg:w-full'>
                            <div className={`${shiftPropertyContainer}`}>
                                <span className='font-semibold'>Shift Start: </span> 
                                <span>{shiftData.shiftStart}</span>
                            </div>
                            <div className={`${shiftPropertyContainer}`}>
                                <span className='font-semibold'>Shift End: </span> 
                                <span>{shiftData.shiftEnd}</span>
                            </div>
                            <div className={`${shiftPropertyContainer}`}>
                                <span className='font-semibold'>Shift Duration: </span> 
                                <span>{shiftData.shiftDuration}</span>
                            </div>
                            <div className={`${shiftPropertyContainer}`}>
                                <span className='font-semibold'>Wage Per Hour: </span> 
                                <span>{`${shift.wagePerHour} ₪`}</span>
                            </div>
                            <div className={`${shiftPropertyContainer}`}>
                                <span className='font-semibold'>Tip / Bonus: </span> 
                                <span>{`${shift.tipBonus} ₪`}</span>
                            </div>
                            <div className={`${shiftPropertyContainer}`}>
                                <span className='font-semibold'>Break Duration: </span> 
                                <span>{shiftData.breakDuration}</span>
                            </div>
                            {shiftData.breakDuration !== '0' && 
                                <>
                                    <div className={`${shiftPropertyContainer}`}>
                                        <span className='font-semibold'>Break Start: </span> 
                                        <span>{shiftData.breakStart}</span>
                                    </div>
                                    <div className={`${shiftPropertyContainer}`}>
                                        <span className='font-semibold'>Break End: </span> 
                                        <span>{shiftData.breakEnd}</span>
                                    </div>
                                </>
                            }
                        </div>
                        <div className={'w-4/6 flex flex-col gap-2 lg:w-full'}>
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
                        <div className='absolute right-4 top-4 cursor-pointer'>
                            <EllipsisHorizontalCircleIcon onClick={() => setShiftOptionsMenu((prev) => !prev)} className='w-5 relative'/>
                            {shiftOptionsMenu &&
                                <div className='flex items-end flex-col gap-2 bg-light shadow-xl p-4 rounded-lg absolute right-0 top-10'>
                                    <Button theme='full' onClick={() => {setEditMode(true); setShiftOptionsMenu(false)}} className='text-xs px-7' text='Edit' type='button'/>
                                    <Button theme='full' onClick={() => {setRemovalModal(true); setShiftOptionsMenu(false)}} className='text-xs' text='Remove' type='button'/>
                                </div>
                            }
                        </div>
                        
                        
                    </div>
                }
            </motion.article>
        }
        {removalModal && <Modal onClose={() => setRemovalModal(false)} className=''>
            <div className='flex flex-col gap-8 px-8 py-4'>
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