import { Shift } from './workPlaceStats/Shift'
import { motion } from 'framer-motion'
import { checkBoxStyle, dashBoardWorkPlaceHeader } from '@/util/mixin';
import { VercelSVG } from '@/util/icons'
import Link from 'next/link';

export interface WorkPlace {
    placeId: string
    name: string
    employmentStartDate: string
    employmentEndDate: string
    employmentDuration: string
    isCurrent: boolean
    hoursPastWeek: number
    hoursPastMonth: number
    totalHours: number
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
export const workPlace = (key: number ,removeButtons: boolean, handleCheckBoxClick: (placeId: string) => void, handleWorkPlaceClick: (placeId: string) => void,
                {placeId, name, employmentStartDate, employmentEndDate, employmentDuration, isCurrent, hoursPastWeek, hoursPastMonth, totalHours, link, checked}: WorkPlace): React.ReactNode => {
        return (
            <motion.article 
                key={key}
                className={`w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl p-8 cursor-pointer
                    border border-solid dark:border-light
                    bg-light shadow-2xl hover:border hover:border-black my-2
                    lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4
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
                <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] 
                        bg-dark dark:bg-light rounded-br-3xl
                        xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem] checked:before:LE
                ' />
    
                <div className='w-1/2 flex flex-col items-start justify-between
                    lg:w-full lg:pl-0 lg:pt-3
                '>
                    <div className={`${isCurrent ? 'text-secondary' : 'DARK'} ${dashBoardWorkPlaceHeader}`}>{name}</div>
                        <div className={`flex flex-col`}>
                        <span className=''>Total Hours: {totalHours}</span>
                        <span className=''>Hours Past Week: {hoursPastWeek}</span>
                        <span className=''>Hours Past Month: {hoursPastMonth}</span>
                        <span className=''>Employment Duration: {employmentDuration}</span>
                        </div>
                    
                </div>
                <Link 
                    href={'/dashboard/workPlaceStats'} 
                    className='w-4/12 cursor-pointer overflow-hidden rounded-lg
                    lg:w-full
                    '>
                    <div onClick={() => handleWorkPlaceClick(placeId)}>
                    <VercelSVG className='' height='24'/>
                    </div>
                </Link>
            </motion.article>
        )
    }