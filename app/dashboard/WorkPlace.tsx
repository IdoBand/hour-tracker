import { Shift } from './workPlaceStats/Shift'
import { motion } from 'framer-motion'
import { checkBoxStyle, dashBoardWorkPlaceHeader, flexCenter } from '@/app/(hooks)/mixin';
import { VercelSVG } from '@/util/icons'
import Link from 'next/link';
import { TimeHelper } from '../(hooks)/TimeHelper';
import { ShiftsManipulator } from '../(hooks)/ShiftsManipulator';
import { SquaresPlusIcon, MagnifyingGlassIcon, ChartBarIcon } from '@heroicons/react/24/solid';

export interface WorkPlace {
    placeId: string
    name: string
    employmentStartDate: string
    employmentEndDate: string
    isCurrent: boolean
    wagePerHour: number
    isBreakPaid: boolean
    link: string
    checked: boolean
    shifts: Shift[]
}

const singleArticle = {
    initial: {
        opacity: 0,
        y: 50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1
        },
    }
}

export function prepareShiftsForTotalTimeCalculation(shifts: Shift[]) {

    if (shifts.length) {
      const dates = ShiftsManipulator.prepareShiftsDatesForTotalCalculation(shifts)
      return TimeHelper.calculateTimeMultipleDates(dates)
    }
    return '0'
}

export const workPlace = (key: number ,removeButtons: boolean, handleCheckBoxClick: (placeId: string) => void, handleWorkPlaceClick: (placeId: string) => void,
    setAddEditShiftForm: any,            
{placeId, name, employmentStartDate, employmentEndDate, isCurrent, link, checked, shifts}: WorkPlace): React.ReactNode => {
        return (
            <motion.article 
                key={key}
                className={`col-span-2 w-full relative rounded-br-2xl rounded-3xl p-6
                    border border-solid dark:border-light
                    bg-light shadow-2xl 
                    lg:col-span-4
                `}
                variants={singleArticle}
                >
                {removeButtons && <input 
                                    data-key={placeId}
                                    type='checkbox' 
                                    checked={checked} 
                                    onClick={(e) => e.stopPropagation()} 
                                    onChange={(e) => {handleCheckBoxClick(e.target.dataset.key as string)}}
                                    className={`${checkBoxStyle}`}/>}
                <div className='flex justify-between'>
                    
                    <div className={`flex flex-col`}>
                        <div className={`${isCurrent ? 'text-secondary' : 'DARK'} ${dashBoardWorkPlaceHeader} w-full mb-4`}>{name}</div>
                        <div>
                            <span className='font-semibold'>Total Hours: </span>
                            <span className=''>{prepareShiftsForTotalTimeCalculation(shifts)}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>Hours Past Week: </span>
                            <span className=''>{prepareShiftsForTotalTimeCalculation(ShiftsManipulator.filterPastWeekShifts(shifts))}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>Hours Past Month: </span>
                            <span className=''>{prepareShiftsForTotalTimeCalculation(ShiftsManipulator.filterPastMonthShifts(shifts))}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>Employment Duration: </span>
                            <span className=''>{TimeHelper.calculateYearlyDuration(employmentStartDate, employmentEndDate)}</span>
                        </div>
                    </div>
                    <div className={`flex justify-center items-end flex-col gap-4 w-max`}>
                        <Link 
                            href={'/dashboard/workPlaceStats'} 
                            className='cursor-pointer shadow-xl rounded-full p-2 ml-4 mt-3 w-max group hover:scale-125'>
                            <div onClick={() => handleWorkPlaceClick(placeId)}>
                                <ChartBarIcon className='w-6 group-hover:fill-secondary'/>
                            </div>
                        </Link>
                        <div className='cursor-pointer shadow-xl rounded-full p-2 ml-4 mt-3 w-max group hover:scale-125' onClick={() => {handleWorkPlaceClick(placeId);setAddEditShiftForm(true)}}>
                            <SquaresPlusIcon className='w-6 group-hover:fill-secondary'/>
                        </div>
                    </div>
                </div>
            </motion.article>
        )
    }