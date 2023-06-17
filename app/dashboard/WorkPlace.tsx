import { Shift } from './workPlaceStats/Shift'
import { dashBoardWorkPlaceHeader, checkboxRemoveStyle } from '@/app/(hooks)/mixin';
import Link from 'next/link';
import { TimeHelper } from '../(hooks)/TimeHelper';
import { ShiftsManipulator } from '../(hooks)/ShiftsManipulator';
import { SquaresPlusIcon, ChartBarIcon } from '@heroicons/react/24/solid';

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


export function prepareShiftsForTotalTimeCalculation(shifts: Shift[]) {
    if (shifts.length) {
        const dates = ShiftsManipulator.prepareShiftsDatesForTotalCalculation(shifts)
        return TimeHelper.calculateTimeMultipleDates(dates)
    }
    return '0'
}

interface WorkPlaceComponentProps {
    workPlace: WorkPlace
    removeButtons: boolean
    handleCheckBoxClick: (placeId: string) => void
    handleWorkPlaceClick: (placeId: string) => void
    setAddEditShiftForm: any
}
export default function WorkPlaceComponent ({workPlace, removeButtons, handleCheckBoxClick, handleWorkPlaceClick, setAddEditShiftForm}: WorkPlaceComponentProps) {
        return (
            <div>
                {removeButtons && <input 
                                    data-key={workPlace.placeId}
                                    type='checkbox' 
                                    checked={workPlace.checked} 
                                    onClick={(e) => e.stopPropagation()} 
                                    onChange={(e) => {handleCheckBoxClick(e.target.dataset.key as string)}}
                                    className={checkboxRemoveStyle}/>}
                <div className='flex justify-between'>
                    <div className={`flex flex-col`}>
                        <div className={`${workPlace.isCurrent ? 'text-secondary' : 'DARK'} ${dashBoardWorkPlaceHeader} w-full mb-4`}>{workPlace.name}</div>
                        <div className='sm:flex xs:flex-col'>
                            <span className='font-semibold md:text-sm sm:text:xs'>Total Hours: </span>
                            <span className='md:text-sm sm:text-xs'>{prepareShiftsForTotalTimeCalculation(workPlace.shifts)}</span>
                        </div>
                        <div className='sm:flex xs:flex-col'>
                            <span className='font-semibold md:text-sm sm:text:xs'>Hours Past Week: </span>
                            <span className='md:text-sm sm:text-xs'>{prepareShiftsForTotalTimeCalculation(ShiftsManipulator.filterPastWeekShifts(workPlace.shifts))}</span>
                        </div>
                        <div className='sm:flex xs:flex-col'>
                            <span className='font-semibold md:text-sm sm:text:xs'>Hours Past Month: </span>
                            <span className='md:text-sm sm:text-xs'>{prepareShiftsForTotalTimeCalculation(ShiftsManipulator.filterPastMonthShifts(workPlace.shifts))}</span>
                        </div>
                        <div className='sm:flex xs:flex-col'>
                            <span className='font-semibold md:text-sm sm:text:xs'>Employment Duration: </span>
                            <span className='md:text-sm sm:text-xs'>{TimeHelper.calculateYearlyDuration(workPlace.employmentStartDate, workPlace.employmentEndDate)}</span>
                        </div>
                    </div>
                    <div className={`flex justify-center items-end flex-col gap-4 w-max`}>
                        <Link 
                            href={'/dashboard/workPlaceStats'} 
                            className={`cursor-pointer shadow-xl rounded-full p-2 ml-4 mt-3 w-max group relative 
                                before:opacity-0 hover:before:opacity-100 before:bg-sky-400 before:text-light before:absolute before:content-['Stats']
                                before:-bottom-7 before:-left-0 before:text-xs before:p-1 before:rounded-lg before:transition-opacity before:duration-400
                            `}>
                            <div onClick={() => handleWorkPlaceClick(workPlace.placeId)}>
                                <ChartBarIcon className='w-6 group-hover:fill-secondary'/>
                            </div>
                        </Link>
                        <div className={`cursor-pointer shadow-xl rounded-full p-2 ml-4 mt-3 w-max group relative
                                before:opacity-0 hover:before:opacity-100 before:bg-sky-400 before:text-light before:absolute before:content-['QuickAdd']
                                before:-bottom-7 before:-left-0 before:text-xs before:p-1 before:rounded-lg before:transition-opacity before:duration-400
                        `} 
                                onClick={() => {handleWorkPlaceClick(workPlace.placeId);setAddEditShiftForm(true)}}>
                            <SquaresPlusIcon className='w-6 group-hover:fill-secondary'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }