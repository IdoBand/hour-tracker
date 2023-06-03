import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { TimeHelper } from '@/app/(hooks)/TimeHelper'
import { format, parseISO } from 'date-fns'
import { flexCenter } from '@/util/mixin'

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
export 

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


export default function ShiftComponent ({shiftId, shiftStart, shiftEnd, breakStart, breakEnd, iWorkedOn, notes, checked}: Shift) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const shift = {
        shiftDate: parseISOString(shiftStart),
        shiftStart: shiftStart.slice(11, 16),
        shiftEnd: shiftEnd.slice(11, 16),
        shiftDuration: TimeHelper.calculateTimeTwoDatesString(shiftStart, shiftEnd),
        breakStart: breakStart.slice(11, 16),
        breakEnd: breakEnd.slice(11, 16),
        breakDuration: TimeHelper.calculateTimeTwoDatesString(breakStart, breakEnd),
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

      const checkOrX = (str: string) => {
        return str ?  <CheckCircleIcon className='w-5 fill-green-500' /> : <XCircleIcon className='w-5 fill-red-400'/>
      }

  return (
    <div 
        className={`w-full flex justify-between flex-col rounded-lg py-1 cursor-pointer`}
        onClick={() => setIsOpen(prev => !prev)}
        >
            
            <div className={`w-full grid grid-cols-7 grid-flow-col rounded-lg px-2 py-1
            ${isOpen && 'bg-gray-200'}
            border border-black hover:bg-sky-100
            `}>
                <span className={`col-start-1 col-end-2 w-full`}>{shift.shiftDate}</span>
                <span className={`col-start-2 col-end-3 w-full`}>{shift.shiftStart}</span>
                <span className={`col-start-3 col-end-4 w-full`}>{shift.shiftEnd}</span>
                <span className={`col-start-4 col-end-5 w-full`}>{shift.shiftDuration}</span>
                <span className={`col-start-5 col-end-6 w-full`}>{shift.breakDuration}</span>
                <span className={`col-start-6 col-end-7 w-full`}>{checkOrX(iWorkedOn)}</span>
                <span className={`col-start-7 col-end-8 w-full flex justify-between`}>{checkOrX(notes)}{MotionArrow()}</span>
            </div>
        {isOpen && 
            <motion.article 
                variants={slideDownDiv}
                initial="initial"
                animate="animate"
            className={`w-full min-h-max shadow-md rounded-lg px-2 py-1 overflow-hidden`}>
                <div className='p-8 flex gap-4'>
                    <div className='w-1/3 flex flex-col gap-2'>
                        <div >
                            <span className='font-semibold'>Shift Start: </span> 
                            <span>{shift.shiftStart}</span>
                        </div>
                        <div >
                            <span className='font-semibold'>Shift End: </span> 
                            <span>{shift.shiftEnd}</span>
                        </div>
                        <div >
                            <span className='font-semibold'>Shift Duration: </span> 
                            <span>{shift.shiftDuration}</span>
                        </div>
                        <div >
                            <span className='font-semibold'>Break Duration: </span> 
                            <span>{shift.breakDuration}</span>
                        </div>
                        {shift.breakDuration !== '0' && 
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
                    <div className='w-2/3 flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <div className='font-semibold'>
                            I Worked On: 
                             </div>
                            {iWorkedOn}
                        </div>
                        <div className='flex flex-col'>
                            <div className='font-semibold'>
                            Notes: 
                             </div>
                            {notes}
                        </div>
                    </div>
                </div>
            </motion.article>
        }
    </div>
  )
}