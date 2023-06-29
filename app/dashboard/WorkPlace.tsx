import { Shift } from './[workPlaceId]/Shift'
import { dashBoardWorkPlaceHeader, checkboxRemoveStyle } from '@/app/(hooks)/mixin';
import Link from 'next/link';
import { TimeHelper } from '../(hooks)/TimeHelper';
import { ShiftsManipulator } from '../(hooks)/ShiftsManipulator';
import { SquaresPlusIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import CustomButton from '../(components)/CustomButton';
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
                        <div className={`${workPlace.isCurrent ? 'text-secondary' : 'DARK'} ${dashBoardWorkPlaceHeader} w-full mb-4`}>{workPlace.name}{workPlace.isCurrent &&<pre className='text-xs text-dark font-light h-full flex items-end'> Current</pre>}</div>
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
                    <div className={`flex justify-center items-end flex-col gap-4`}>
                        <CustomButton 
                            className='shadow-xl rounded-full p-2 ml-4 mt-3 w-max group'
                            hoverText='Statistics'
                            where='down'
                            onClick={() => {handleWorkPlaceClick(workPlace.placeId)}}
                            >
                            <Link href={`/dashboard/${workPlace.placeId}`}>
                                    <ChartBarIcon className='w-6 h-6 group-hover:fill-secondary'/>
                            </Link>
                            </CustomButton>
                        <CustomButton
                            className='shadow-xl rounded-full p-2 ml-4 mt-3 w-max group'
                            hoverText='Quick Add'
                            where='down'
                            onClick={() => {handleWorkPlaceClick(workPlace.placeId); setAddEditShiftForm(true)}}
                            >
                                <SquaresPlusIcon className='w-6 group-hover:fill-secondary'/>
                        </CustomButton>
                    </div>
                </div>
            </div>
        )
    }