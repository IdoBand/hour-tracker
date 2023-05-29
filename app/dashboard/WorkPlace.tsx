import { Shift } from './workPlaceStats/Shift'
import { motion } from 'framer-motion'
import { checkBoxStyle, dashBoardWorkPlaceHeader } from '@/util/mixin';
import { VercelSVG } from '@/util/icons'
import Link from 'next/link';
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
  } from 'date-fns'
export class Deserializer {
    deserializeWorkPlace(data: any) {
    }
}


function calculateDuration (start: string, end: string) {
            if (!end) {
                end = formatISO(new Date())
            } 
            const startDate = new Date(start)
            const endDate = new Date(end)
            const daysDifference = differenceInDays(endDate, startDate)
            if (daysDifference < 365){
                return daysDifference.toString()
            } else if (daysDifference > 365 && daysDifference % 365 !== 0) {
                const yearsDifference = differenceInYears(endDate, startDate)
                const remainingDays = daysDifference - yearsDifference * 365
                return `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''} and ${remainingDays} Days`
            } else {
                const yearsDifference = differenceInYears(endDate, startDate)
                return `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''}`
            }
        }
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
    link: string
    checked: boolean
    shifts: Shift[]
}



const place1: WorkPlace = {
    placeId: (Date.now()-400).toString(),
    name: 'WORK PLACE NAME 1',
    employmentStartDate: '2022-05-11T13:00',
    employmentEndDate: '2023-05-11T13:00',
    employmentDuration: calculateDuration('2022-05-11T13:00','2023-05-11T13:00'),
    isCurrent: true,
    hoursPastWeek: 50,
    hoursPastMonth: 180,
    totalHours: 2056,
    wagePerHour: 44,
    link: '',
    checked: false,
    shifts: []
}
const place2: WorkPlace = {
    placeId: (Date.now()-200).toString(),
    name: 'WORK PLACE NAME 1',
    employmentStartDate: '2019-05-11T13:00',
    employmentEndDate: '2021-10-11T13:00',
    employmentDuration: calculateDuration('2019-05-11T13:00','2021-10-11T13:00'),
    isCurrent: false,
    hoursPastWeek: 50,
    hoursPastMonth: 180,
    totalHours: 2056,
    wagePerHour: 44,
    link: '',
    checked: false,
    shifts: []
    
}
const place3: WorkPlace = {
    placeId: (Date.now()+200).toString(),
    name: 'WORK PLACE NAME 1',
    employmentStartDate: '2012-12-11T13:00',
    employmentEndDate: '2019-05-11T13:00',
    employmentDuration: calculateDuration('2012-12-11T13:00','2019-05-11T13:00'),
    isCurrent: false,
    hoursPastWeek: 50,
    hoursPastMonth: 180,
    totalHours: 2056,
    wagePerHour: 44,
    link: '',
    checked: false,
    shifts: []
    
}


export const PLACES_OF_WORK: WorkPlace[] = [place1, place2, place3]

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

// export class WorkPlace {
//     placeId: string
//     name: string
//     employmentStartDate: string
//     employmentEndDate: string
//     employmentDuration: string
//     isCurrent: boolean
//     hoursPastWeek: number
//     hoursPastMonth: number
//     totalHours: number
//     wagePerHour: number
//     link: string
//     checked: boolean
//     shifts: Shift[]
//     constructor(
//         placeId: string, 
//         name: string, 
//         employmentStartDate: string, 
//         employmentEndDate: string, 
//         wagePerHour: number, 
//         isCurrent: boolean, 
//         hoursPastWeek: number,
//         hoursPastMonth: number,
//         totalHours: number,
//         link: string,
//         checked: boolean=false,
//         shifts=[]) 
//         {
//         this.placeId = placeId
//         this.name = name
//         this.employmentStartDate = employmentStartDate
//         this.employmentEndDate = employmentEndDate
//         this.employmentDuration = this.calculateDuration(this.employmentStartDate, this.employmentEndDate)
//         this.isCurrent = isCurrent
//         this.hoursPastWeek = hoursPastWeek
//         this.hoursPastMonth = hoursPastMonth
//         this.totalHours = totalHours
//         this.wagePerHour= wagePerHour
//         this.link = link
//         this.checked = checked
//         this.shifts = shifts
//     }
//     calculateTotalHours() {
//         return
//     }
//     calculateHoursPastWeek() {
//         return
//     }
//     calculateHoursPastMonth() {
//         return
//     }
//     calculateDuration (start: string, end: string) {
//         if (!end) {
//             end = formatISO(new Date())
//         } 
//         const startDate = new Date(start)
//         const endDate = new Date(end)
//         const daysDifference = differenceInDays(endDate, startDate)
//         if (daysDifference < 365){
//             return daysDifference.toString()
//         } else if (daysDifference > 365 && daysDifference % 365 !== 0) {
//             const yearsDifference = differenceInYears(endDate, startDate)
//             const remainingDays = daysDifference - yearsDifference * 365
//             return `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''} and ${remainingDays} Days`
//         } else {
//             const yearsDifference = differenceInYears(endDate, startDate)
//             return `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''}`
//         }
//     }
//     serialize() {
//         return {
//             placeId: this.placeId,
//             name: this.name,
//             employmentStartDate: this.employmentStartDate,
//             employmentEndDate: this.employmentEndDate,
//             employmentDuration: this.employmentDuration,
//             isCurrent: this.isCurrent,
//             hoursPastWeek: this.hoursPastWeek,
//             hoursPastMonth: this.hoursPastMonth,
//             totalHours: this.totalHours,
//             wagePerHour: this.wagePerHour,
//             link: this.link,
//             checked: this.checked,
//             shifts: this.shifts,
//         }
//     }
// }