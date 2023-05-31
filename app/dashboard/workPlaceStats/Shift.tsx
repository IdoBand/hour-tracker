import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { TimeHelper } from '@/app/(hooks)/TimeHelper'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    getYear,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    formatISO,
    startOfToday,
    differenceInDays,
    differenceInYears,
    differenceInMinutes
  } from 'date-fns'
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
                <span className={`col-start-1 col-end-2 w-full`}>{parseISOString(shiftStart)}</span>
                <span className={`col-start-2 col-end-3 w-full`}>{shiftStart.slice(11, 16)}</span>
                <span className={`col-start-3 col-end-4 w-full`}>{shiftEnd.slice(11, 16)}</span>
                <span className={`col-start-4 col-end-5 w-full`}>{TimeHelper.calculateTimeTwoDatesString(shiftStart, shiftEnd)}</span>
                <span className={`col-start-5 col-end-6 w-full`}>{TimeHelper.calculateTimeTwoDatesString(breakStart, breakEnd)}</span>
                <span className={`col-start-6 col-end-7 w-full`}>{checkOrX(iWorkedOn)}</span>
                <span className={`col-start-7 col-end-8 w-full flex justify-between`}>{checkOrX(notes)}{MotionArrow()}</span>
            </div>
        {isOpen && 
            <motion.article 
                variants={slideDownDiv}
                initial="initial"
                animate="animate"
            className={`w-full min-h-max shadow-md rounded-lg px-2 py-1 overflow-hidden`}>
                <div className='p-8'>
                <p>{`Lorem ipsum dolor sit amet. Eum assumenda illo sit obcaecati iste et sint aliquid 33 libero voluptatibus est delectus consequuntur nam error repudiandae aut ratione voluptas. Eos nihil voluptatem qui aperiam sunt et provident accusantium non dicta placeat aut consequatur quia et facere ipsam.

Sit porro autem ab dolorem veritatis qui exercitationem voluptas in perferendis voluptas est numquam minus. Est labore harum nam dolores dolorem et ratione saepe et nesciunt modi sit molestiae voluptas. Et enim consequuntur qui recusandae dolorem sed odio molestiae ad internos quia est quia alias quo adipisci eius sit dolores nobis. Aut delectus illum 33 incidunt vitae est aliquam omnis.

Est incidunt excepturi non tempore fugit cum voluptatibus rerum et galisum adipisci ut aspernatur tempore? Vel exercitationem consectetur et cupiditate quas sit molestiae nesciunt rem totam neque non assumenda nihil rem omnis repudiandae`}
</p>
                </div>
            </motion.article>
        }
    </div>
  )
}